import { DateTime } from 'luxon';
import { Message } from '../model/message-model';
import {
  CHAT_EVENTS,
  CHAT_WINDOW_HEIGHT,
  CHAT_WINDOW_WIDTH,
  LOCAL_STORAGE_CHAT_DIMENSIONS_KEY,
  SESSION_STORAGE_CHAT_ID_KEY,
  TERMINATE_STATUS
} from '../constants';
import { setToSessionStorage } from './session-storage-utils';
import { getFromLocalStorage } from './local-storage-utils';

export const findMatchingMessageFromMessageList = (messageToMatch: Message, messages: Message[]): Message | undefined =>
  messages.find(
    (message) =>
      message.authorTimestamp?.trim() !== '' &&
      DateTime.fromISO(message.authorTimestamp).toString() === DateTime.fromISO(messageToMatch.authorTimestamp).toString() &&
      message.authorRole === messageToMatch.authorRole,
  );

export const isStateChangingEventMessage = (msg: Message): boolean =>
  msg.event === CHAT_EVENTS.GREETING ||
  msg.event === CHAT_EVENTS.ASK_PERMISSION_IGNORED ||
  (msg.event === CHAT_EVENTS.CONTACT_INFORMATION && msg.content?.length === 0) ||
  msg.event === CHAT_EVENTS.ANSWERED ||
  msg.event === CHAT_EVENTS.TERMINATED ||
  msg.event === TERMINATE_STATUS.CLIENT_LEFT_WITH_ACCEPTED ||
  msg.event === TERMINATE_STATUS.CLIENT_LEFT_WITH_NO_RESOLUTION || 
  msg.event === TERMINATE_STATUS.CLIENT_LEFT_FOR_UNKNOWN_REASONS || 
  msg.event === TERMINATE_STATUS.ACCEPTED ||
  msg.event === TERMINATE_STATUS.HATE_SPEECH || 
  msg.event === TERMINATE_STATUS.OTHER || 
  msg.event === TERMINATE_STATUS.RESPONSE_SENT_TO_CLIENT_EMAIL

export const clearStateVariablesFromSessionStorage = (): void => {
  setToSessionStorage(SESSION_STORAGE_CHAT_ID_KEY, null);
  setToSessionStorage('newMessagesAmount', 0);
};

export const getInitialChatDimensions = (): { width: number, height: number } => {
  const storedDimensions = getFromLocalStorage(LOCAL_STORAGE_CHAT_DIMENSIONS_KEY)

  const isValiedValue = !isNaN(storedDimensions?.width) && !isNaN(storedDimensions?.height);

  return isValiedValue
    ? storedDimensions
    : {
      width: CHAT_WINDOW_WIDTH,
      height: CHAT_WINDOW_HEIGHT
    };
}
