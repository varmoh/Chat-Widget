import { AUTHOR_ROLES, CHAT_EVENTS, CHAT_MODES } from "../constants";
import { Message, MessageButton } from "../model/message-model";
import { EndUserContacts } from "../slices/chat-slice";

export const parseButtons = (message: Message): MessageButton[] => {
  try {
    if(!message?.buttons || message.buttons === '')
      return [];
    return JSON.parse(message.buttons) as MessageButton[];
  } catch(e) {
    console.error(e);
    return [];
  }
}

export const parseOptions = (message: Message): string[] => {
  try {
    if(!message?.options || message.options === '')
      return [];
    return JSON.parse(message.options) as string[];
  } catch(e) {
    console.error(e);
    return [];
  }
}

export const getChatModeBasedOnLastMessage = (messages: Message[]): CHAT_MODES => {
  let lastMsgButtonsCount = 0;

  if(messages && messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    const buttons = parseButtons(lastMsg);
    lastMsgButtonsCount = buttons.length;
  }

  return lastMsgButtonsCount === 0 ? CHAT_MODES.FREE : CHAT_MODES.FLOW;
}

export const getContactFormFulfilledNewMessage = (
  endUserContacts: EndUserContacts,
  chatId: string | null,
  messageId: string,
  t: any,
): Message => {
  let message;
  if (endUserContacts.phoneNr && endUserContacts.mailAddress) {
    message = t("chatMessage.email-and-phone-template", {
      email: endUserContacts.mailAddress,
      phoneNr: endUserContacts.phoneNr,
    });
  } else if (endUserContacts.mailAddress){
    message = t("chatMessage.email-only-template", {
      email: endUserContacts.mailAddress,
    });
  } else {
    message = t("chatMessage.phone-only-template", {
      phoneNr: endUserContacts.phoneNr,
    });
  }

  return {
    chatId,
    id: messageId,
    authorRole: AUTHOR_ROLES.END_USER,
    authorTimestamp: new Date().toISOString(),
    content: message,
    event: CHAT_EVENTS.CONTACT_INFORMATION_FULFILLED,
    preview: "",
  };
}

export const getContactCommentNewMessage = (
  comment: string,
  chatId: string | null,
  messageId: string,
  t: any,
): Message => {
  const message = t("chatMessage.comment-template", { comment });
  
  return {
    chatId,
    id: messageId,
    authorRole: AUTHOR_ROLES.END_USER,
    authorTimestamp: new Date().toISOString(),
    content: message,
    event: "",
    preview: "",
  };
}

export const filterDuplicatMessages = (messages: Message[]|any[]): Message[]|any[] => {
  const seen = new Set();
  const result = [];

  for (let i = messages.length - 1; i >= 0; i--) {
    const duplicate = seen.has(messages[i].id);
    seen.add(messages[i].id);
    if(!duplicate || !messages[i].id) {
      result.unshift(messages[i]);
    }
  }

  return result;
}
