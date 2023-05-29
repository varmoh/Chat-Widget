import React, { FC, useEffect, useState } from "react";
import { getFromSessionStorage } from "./utils/session-storage-utils";
import { isOfficeHours } from "./utils/office-hours-utils";
import Chat from "./components/chat/chat";
import Profile from "./components/profile/profile";
import useChatSelector from "./hooks/use-chat-selector";
import useInterval from "./hooks/use-interval";
import {
  OFFICE_HOURS_INTERVAL_TIMEOUT,
  SESSION_STORAGE_CHAT_ID_KEY,
} from "./constants";
import { getChat, getChatMessages, setChatId } from "./slices/chat-slice";
import { useAppDispatch } from "./store";
import useNewMessageNotification from "./hooks/use-new-message-notification";
import useAuthentication from "./hooks/use-authentication";
import useGetNewMessages from "./hooks/use-get-new-messages";
import useGetChat from "./hooks/use-get-chat";
import useWidgetSelector from "./hooks/use-widget-selector";
import { getWidgetConfig } from "./slices/widget-slice";
import useGetWidgetConfig from "./hooks/use-get-widget-config";

declare global {
  interface Window {
    _env_: {
      RUUTER_API_URL: string;
      RUUTER_2_API_URL: string;
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
    };
  }
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isChatOpen, messages, chatId } = useChatSelector();
  const { widgetConfig } = useWidgetSelector();
  const [displayWidget, setDisplayWidget] = useState(
    !!getFromSessionStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
  );

  useInterval(
    () =>
      setDisplayWidget(
        !!getFromSessionStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
      ),
    OFFICE_HOURS_INTERVAL_TIMEOUT
  );
  useGetWidgetConfig();
  useAuthentication();
  useGetChat();
  useGetNewMessages();
  useNewMessageNotification();

  useEffect(() => {
    const sessionStorageChatId = getFromSessionStorage(
      SESSION_STORAGE_CHAT_ID_KEY
    );
    if (sessionStorageChatId !== null)
      dispatch(setChatId(sessionStorageChatId));
  }, [dispatch]);

  useEffect(() => {
    if (chatId && !messages.length) {
      dispatch(getChat());
      dispatch(getChatMessages());
    }
    if (!widgetConfig.isLoaded) dispatch(getWidgetConfig());
  }, [chatId, dispatch, messages, widgetConfig]);

  if (displayWidget && widgetConfig.isLoaded)
    return isChatOpen ? <Chat /> : <Profile />;
  return <></>;
};

export default App;
