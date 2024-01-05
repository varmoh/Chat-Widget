import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import sse from '../services/sse-service';
import useChatSelector from './use-chat-selector';
import { Message } from '../model/message-model';
import { CHAT_EVENTS, RUUTER_ENDPOINTS, TERMINATE_STATUS } from '../constants';
import { addMessagesToDisplay, handleStateChangingEventMessages } from '../slices/chat-slice';
import { isDisplayableMessages, isStateChangingEventMessage } from '../utils/state-management-utils';
import useAuthenticationSelector from './use-authentication-selector';
import { use } from 'i18next';
import chatService from '../services/chat-service';

const useGetNewMessages = (): void => {
  const { lastReadMessageTimestamp, isChatEnded, chatId } = useChatSelector();
  const { jwtCookie } = useAuthenticationSelector();
  const dispatch = useAppDispatch();
  const [sseUrl, setSseUrl] = useState('');
  const [lastReadMessageTimestampValue, setLastReadMessageTimestampValue] = useState('');
  
  useEffect(() => {
    if(lastReadMessageTimestamp && !lastReadMessageTimestampValue){
      setLastReadMessageTimestampValue(lastReadMessageTimestamp);
    }
  }, [lastReadMessageTimestamp]);

  useEffect(() => {
    if(isChatEnded || !chatId) {
      setSseUrl('');
    }
    else if (chatId && lastReadMessageTimestampValue) {
      setSseUrl(`/${chatId}`);
    }
  }, [isChatEnded, chatId, lastReadMessageTimestampValue]);

  useEffect(() => {
    let events: EventSource | undefined;
    if (sseUrl) {  
      const onMessage = (messages: Message[]) => {    
        dispatch(addMessagesToDisplay(messages.filter(isDisplayableMessages)));
        dispatch(handleStateChangingEventMessages(messages.filter(isStateChangingEventMessage)));
      };

      events = sse(sseUrl, onMessage);
    }
    return () => {
      events?.close();
    };
  }, [sseUrl]);
};

export default useGetNewMessages;
