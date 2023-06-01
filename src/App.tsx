import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { getFromSessionStorage } from './utils/session-storage-utils';
import { isOfficeHours } from './utils/office-hours-utils';
import Profile from './components/profile/profile';
import Chat from './components/chat/chat';
import useChatSelector from './hooks/use-chat-selector';
import useInterval from './hooks/use-interval';
import {
  ONLINE_CHECK_INTERVAL,
  OFFICE_HOURS_INTERVAL_TIMEOUT,
  SESSION_STORAGE_CHAT_ID_KEY,
  CHAT_STATUS,
  ONLINE_CHECK_INTERVAL_ACTIVE_CHAT,
  IDLE_CHAT_INTERVAL,
} from './constants';
import { getChat, getChatMessages, getEmergencyNotice, setChatId } from "./slices/chat-slice";
import { useAppDispatch, useAppSelector } from './store';
import useNewMessageNotification from './hooks/use-new-message-notification';
import useAuthentication from './hooks/use-authentication';
import useGetNewMessages from './hooks/use-get-new-messages';
import useGetChat from './hooks/use-get-chat';
import { burokrattOnlineStatusRequest } from './slices/widget-slice';
import useWidgetSelector from "./hooks/use-widget-selector";
import { getWidgetConfig } from "./slices/widget-slice";
import useGetWidgetConfig from "./hooks/use-get-widget-config";
import useGetEmergencyNotice from "./hooks/use-get-emergency-notice";
import { customJwtExtend } from './slices/authentication-slice';

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
  const { isChatOpen, messages, chatId, emergencyNotice } = useChatSelector();
  const { widgetConfig } = useWidgetSelector();
  const [displayWidget, setDisplayWidget] = useState(
    !!getFromSessionStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
  );
  const [onlineCheckInterval, setOnlineCheckInterval] = useState(ONLINE_CHECK_INTERVAL);
  const { burokrattOnlineStatus } = useAppSelector((state) => state.widget);
  const { chatStatus } = useAppSelector((state) => state.chat);

  useLayoutEffect(() => {
    if (burokrattOnlineStatus === null) dispatch(burokrattOnlineStatusRequest());
    else if(burokrattOnlineStatus === false) setOnlineCheckInterval(ONLINE_CHECK_INTERVAL);
      else if(chatStatus === CHAT_STATUS.OPEN) setOnlineCheckInterval(ONLINE_CHECK_INTERVAL_ACTIVE_CHAT)
  }, [chatStatus,burokrattOnlineStatus]);

  useInterval(
    () => dispatch(burokrattOnlineStatusRequest()),
    onlineCheckInterval
  );

  useInterval(
    () =>
      setDisplayWidget(
        !!getFromSessionStorage(SESSION_STORAGE_CHAT_ID_KEY) || isOfficeHours()
      ),
    OFFICE_HOURS_INTERVAL_TIMEOUT
  );

  useGetWidgetConfig();
  useGetEmergencyNotice();
  useAuthentication();
  useGetChat();
  useGetNewMessages();
  useNewMessageNotification();

  useLayoutEffect(() => {
    let waitTime = IDLE_CHAT_INTERVAL; 
    const interval = setInterval(() => {
      if(!displayWidget || !isChatOpen || !chatId) return;
      dispatch(customJwtExtend())
      waitTime = 120 * 60 * 1000;
    }, waitTime );
    return () => clearInterval(interval);
  }, [messages]);

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
    if (emergencyNotice === null) dispatch(getEmergencyNotice());
    if (!widgetConfig.isLoaded) dispatch(getWidgetConfig());
  }, [chatId, dispatch, messages, widgetConfig]);

  if (burokrattOnlineStatus !== true) return <></>;
  if (displayWidget && widgetConfig.isLoaded)
    return isChatOpen ? <Chat /> : <Profile />;
  return <></>;
};

export default App;
