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
    const sseInstance = sse(`${RUUTER_ENDPOINTS.GET_NEW_MESSAGES}?chatId=${chatId}&timeRangeBegin=${lastReadMessageTimestamp.split('+')[0]}`);

    sseInstance.onMessage((messages: Message[]) => {
      const newDisplayableMessages = messages.filter((msg) => msg.event !== CHAT_EVENTS.GREETING && msg.event !== TERMINATE_STATUS.CLIENT_LEFT_WITH_ACCEPTED && msg.event !== TERMINATE_STATUS.CLIENT_LEFT_WITH_NO_RESOLUTION && msg.event !== TERMINATE_STATUS.CLIENT_LEFT_FOR_UNKNOWN_REASONS && msg.event !== TERMINATE_STATUS.ACCEPTED && msg.event !== TERMINATE_STATUS.HATE_SPEECH && msg.event !== TERMINATE_STATUS.OTHER && msg.event !== TERMINATE_STATUS.RESPONSE_SENT_TO_CLIENT_EMAIL);
      const stateChangingEventMessages = messages.filter((msg) => isStateChangingEventMessage(msg));
      dispatch(addMessagesToDisplay(newDisplayableMessages));
      dispatch(handleStateChangingEventMessages(stateChangingEventMessages));
    });

    return () => sseInstance.close();
  }, [dispatch, lastReadMessageTimestamp, chatId, isChatEnded, jwtCookie]);
};

export default useGetNewMessages;
