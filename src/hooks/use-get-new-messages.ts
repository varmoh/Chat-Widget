import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import sse from '../services/sse-service';
import useChatSelector from './use-chat-selector';
import { Message } from '../model/message-model';
import { CHAT_EVENTS, RUUTER_ENDPOINTS, TERMINATE_STATUS } from '../constants';
import { addMessagesToDisplay, handleStateChangingEventMessages } from '../slices/chat-slice';
import { isStateChangingEventMessage } from '../utils/state-management-utils';
import useAuthenticationSelector from './use-authentication-selector';

const useGetNewMessages = (): void => {
  const { lastReadMessageTimestamp, isChatEnded, chatId } = useChatSelector();
  const { jwtCookie } = useAuthenticationSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chatId || isChatEnded || !lastReadMessageTimestamp) return undefined;
    
    const onMessage = (messages: Message[]) => {
      const nonDisplayableEvent = [
        CHAT_EVENTS.GREETING.toString(),
        TERMINATE_STATUS.CLIENT_LEFT_WITH_ACCEPTED.toString(), 
        TERMINATE_STATUS.CLIENT_LEFT_WITH_NO_RESOLUTION.toString(), 
        TERMINATE_STATUS.CLIENT_LEFT_FOR_UNKNOWN_REASONS.toString(), 
        TERMINATE_STATUS.ACCEPTED.toString(), 
        TERMINATE_STATUS.HATE_SPEECH.toString(), 
        TERMINATE_STATUS.OTHER.toString(), 
        TERMINATE_STATUS.RESPONSE_SENT_TO_CLIENT_EMAIL.toString(),
      ]

      const newDisplayableMessages = messages.filter((msg) => !nonDisplayableEvent.includes(msg.event!));
      const stateChangingEventMessages = messages.filter((msg) => isStateChangingEventMessage(msg));
      dispatch(addMessagesToDisplay(newDisplayableMessages));
      dispatch(handleStateChangingEventMessages(stateChangingEventMessages));
    };

    const events = sse(
      `${RUUTER_ENDPOINTS.GET_NEW_MESSAGES}?chatId=${chatId}&timeRangeBegin=${lastReadMessageTimestamp.split('+')[0]}`,
      onMessage
    );

    return () => {
      events.close();
    };

  }, [dispatch, lastReadMessageTimestamp, chatId, isChatEnded, jwtCookie]);
};

export default useGetNewMessages;
