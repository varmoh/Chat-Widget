import React, { FC, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { isOfficeHours } from "./utils/office-hours-utils";

const Profile = lazy(() => import("./components/profile/profile"));
const Chat = lazy(() => import("./components/chat/chat"));
import useChatSelector from "./hooks/use-chat-selector";
import useInterval from "./hooks/use-interval";
import {
  ONLINE_CHECK_INTERVAL,
  OFFICE_HOURS_INTERVAL_TIMEOUT,
  SESSION_STORAGE_CHAT_ID_KEY,
  CHAT_STATUS,
  ONLINE_CHECK_INTERVAL_ACTIVE_CHAT,
  EXTEND_JWT_COOKIE_IN_MS,
  CHAT_SESSIONS,
  LOCAL_STORAGE_INSTANTLY_OPEN_CHAT_WIDGET_KEY,
  CHAT_EVENTS,
} from "./constants";
import {
  endChat,
  getChat,
  getChatMessages,
  getEmergencyNotice,
  resetState,
  setChatId,
  setIsChatOpen,
} from "./slices/chat-slice";
import { useAppDispatch, useAppSelector } from "./store";
import useNewMessageNotification from "./hooks/use-new-message-notification";
import useAuthentication from "./hooks/use-authentication";
import useGetNewMessages from "./hooks/use-get-new-messages";
import useGetChat from "./hooks/use-get-chat";
import { getWidgetConfig } from "./slices/widget-slice";
import useWidgetSelector from "./hooks/use-widget-selector";
import useGetEmergencyNotice from "./hooks/use-get-emergency-notice";
import { customJwtExtend } from "./slices/authentication-slice";
import { getFromLocalStorage, setToLocalStorage } from "./utils/local-storage-utils";
import { redeemNetworkHandover, watchNetworkHandoverLinks } from "./utils/network-handover-utils";
import useNameAndTitleVisibility from "./hooks/use-name-title-visibility";
import { generateUEID } from "./utils/generators";
import { isMobile, isMobileApp, isMobileWidth } from "./utils/browser-utils";
import { namespacedKey } from "./utils/widget-instance-utils";
import { ScrollProvider } from "./contexts/ScrollContext";

declare global {
  interface Window {
    _env_: {
      RUUTER_API_URL: string;
      NOTIFICATION_NODE_URL: string;
      ENVIRONMENT: "development"; // 'developement | production'
      TIM_AUTHENTICATION_URL: string;
      ORGANIZATION_NAME: string;
      TERMS_AND_CONDITIONS_LINK: string;
      OFFICE_HOURS: {
        ENABLED: boolean;
        TIMEZONE: string;
        BEGIN: number;
        END: number;
        DAYS: number[];
      };
      ENABLE_HIDDEN_FEATURES: string;
      FEEDBACK_RATING_COLORS_ENABLED: string;
      ENABLE_MULTI_DOMAIN: string;
      WIDGET_DOMAIN: string;
      WIDGET_HEIGHT: number;
      WIDGET_WIDTH: number;
      TERMINATION_TIMEOUT: number;
      STREAM_TYPING_SPEED: number;
      IFRAME_TARGET_OIRGIN: string;
      SMAX_INTEGRATION: { enabled: boolean };
      FALLBACK_LANGUAGE: string;
    };
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isChatOpen, messages, chatId, emergencyNotice, isFullScreen } = useChatSelector();
  const { widgetConfig } = useWidgetSelector();
  const [displayWidget, setDisplayWidget] = useState(
    !!getFromLocalStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
  );
  const [onlineCheckInterval, setOnlineCheckInterval] = useState(
    ONLINE_CHECK_INTERVAL
  );
  const { burokrattOnlineStatus } = useAppSelector((state) => state.widget);
  const { chatStatus } = useAppSelector((state) => state.chat);

  useLayoutEffect(() => {
    if (burokrattOnlineStatus === false)
      setOnlineCheckInterval(ONLINE_CHECK_INTERVAL);
    else if (chatStatus === CHAT_STATUS.OPEN)
      setOnlineCheckInterval(ONLINE_CHECK_INTERVAL_ACTIVE_CHAT);
  }, [chatStatus, burokrattOnlineStatus]);

  useInterval(() => dispatch(getWidgetConfig()), onlineCheckInterval);

  useInterval(
    () =>
      setDisplayWidget(
        !!getFromLocalStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
      ),
    OFFICE_HOURS_INTERVAL_TIMEOUT
  );

  // Bürokrati võrgustik (demo): teise asutuse ühekordne link avab üle antud vestluse
  useEffect(() => {
    redeemNetworkHandover();
  }, []);

  // Bürokrati võrgustik (demo): vestlus anti teisele asutusele üle ja kasutaja avas lingi:
  // lõpeta siinne vestlus (ilma tagasisidevaateta) ja sulge vidin
  useEffect(
    () =>
      watchNetworkHandoverLinks(() => {
        dispatch(endChat({ event: CHAT_EVENTS.CLIENT_LEFT_WITH_ACCEPTED, isUpperCase: true }));
      }),
    [dispatch]
  );

  useEffect(() => {
    // Prevent meaningless body scrolling when chat is open on mobile
    if (isMobileWidth()) {
      document.getElementsByTagName("body")[0].style.overflow = isChatOpen
        ? "hidden"
        : "auto";
    }

    window.parent.postMessage({ isOpened: isChatOpen, isFullScreen: isFullScreen }, window._env_.IFRAME_TARGET_OIRGIN);
  }, [isChatOpen, isFullScreen]);

  useGetEmergencyNotice();
  useAuthentication();
  useGetChat();
  useGetNewMessages();
  useNewMessageNotification();

  useEffect(() => {
    const storageHandler = () => {
      const storedData = getFromLocalStorage(SESSION_STORAGE_CHAT_ID_KEY);
      const previousChatId = getFromLocalStorage("previousChatId");
      if (storedData === null && previousChatId === null) {
        setChatId("");
        dispatch(setChatId(""));
        dispatch(setIsChatOpen(false));
        dispatch(resetState());
      }
    };

    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, []);

  useEffect(() => {
    const delay = 1000;

    const timeOutId = setTimeout(() => {
      initializeSession();
    }, delay);

    return () => clearTimeout(timeOutId);
  }, []);

  const initializeSession = () => {
    let tabId = sessionStorage.getItem(namespacedKey("tabId"));
    if (!tabId) {
      tabId = generateUEID();
      sessionStorage.setItem(namespacedKey("tabId"), tabId);
    }

    let currentState = getCurrentSessionState();

    if (!currentState.ids.includes(tabId)) {
      currentState.ids.push(tabId);
      currentState.count = currentState.ids.length;
      localStorage.setItem(
        namespacedKey(CHAT_SESSIONS.SESSION_STATE_KEY),
        JSON.stringify(currentState)
      );
    }

    const handleTabClose = () => {
      const currentAppState = JSON.parse(
        localStorage.getItem(namespacedKey(CHAT_SESSIONS.SESSION_STATE_KEY)) as string
      ) || { ids: [], count: 0 };

      const updatedIds = currentAppState.ids.filter(
        (id: string) => id !== tabId
      );
      const updatedState = {
        ids: updatedIds,
        count: updatedIds.length,
      };

      localStorage.setItem(
        namespacedKey(CHAT_SESSIONS.SESSION_STATE_KEY),
        JSON.stringify(updatedState)
      );
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  };

  const getCurrentSessionState = () => {
    return (
      JSON.parse(
        localStorage.getItem(namespacedKey(CHAT_SESSIONS.SESSION_STATE_KEY)) as string
      ) || { ids: [], count: 0 }
    );
  };

  useLayoutEffect(() => {
    if (!displayWidget || !isChatOpen || !chatId) return;
    const interval = setInterval(() => {
      if (!displayWidget || !isChatOpen || !chatId) return;
      dispatch(customJwtExtend());
    }, EXTEND_JWT_COOKIE_IN_MS);

    return () => clearInterval(interval);
  }, [messages]);

  useEffect(() => {
    const sessionStorageChatId = getFromLocalStorage(
      SESSION_STORAGE_CHAT_ID_KEY
    );
    if (sessionStorageChatId) {
      dispatch(setChatId(sessionStorageChatId));
      dispatch(setIsChatOpen(true));
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId && !messages.length) {
      dispatch(getChat());
      dispatch(getChatMessages());
    }
    if (emergencyNotice === null) dispatch(getEmergencyNotice());
    if (!widgetConfig.isLoaded) dispatch(getWidgetConfig());
  }, [chatId, dispatch, messages, widgetConfig]);

  useEffect(() => {
    if (!widgetConfig.instantlyOpenChatWidget || isMobile() || chatId) return;

    const localStorageValue = getFromLocalStorage(LOCAL_STORAGE_INSTANTLY_OPEN_CHAT_WIDGET_KEY);
    const shouldOpen = localStorageValue === true || localStorageValue === null;

    dispatch(setIsChatOpen(shouldOpen));
    setToLocalStorage(LOCAL_STORAGE_INSTANTLY_OPEN_CHAT_WIDGET_KEY, shouldOpen);
  }, [widgetConfig]);

  useNameAndTitleVisibility();

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (burokrattOnlineStatus !== true) return <></>;
  if (displayWidget && widgetConfig.isLoaded)
    return (
      <ScrollProvider>
        <Suspense fallback={null}>
          {isMobileApp() || isChatOpen ? <Chat triggerRef={triggerRef} /> : <Profile triggerRef={triggerRef} />}
        </Suspense>
      </ScrollProvider>
    );
  return <></>;
};

export default App;
