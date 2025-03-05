import { UserContacts } from "./../model/user-contacts-model";
import http from "./http-service";
import { Attachment, Message } from "../model/message-model";
import { Chat } from "../model/chat-model";
import { RUUTER_ENDPOINTS } from "../constants";
import { EndUserTechnicalData } from "../model/chat-ini-model";
import { EmergencyNoticeResponse } from "../model/emergency-notice-response-model";
import { EstimatedWaiting } from "../slices/chat-slice";
import notificationHttp from "./notification-service";

interface Document {
  _id: string;
}

interface Response {
  config: Record<any, any>;
  data: {
    response: Record<any, any>;
  };
  headers: Record<any, any>;
  request: Record<any, any>;
  status: number;
  statusText: string;
}

class ChatService {
  init(
    message: Message,
    endUserTechnicalData: EndUserTechnicalData,
    holidays: string[],
    holidayNames: string
  ): Promise<Chat> {
    return http.post(RUUTER_ENDPOINTS.INIT_CHAT, {
      message,
      endUserTechnicalData,
      holidays,
      holidayNames,
    });
  }

  getChatById(): Promise<Chat> {
    return http.get(RUUTER_ENDPOINTS.GET_CHAT_BY_ID);
  }

  sendNewMessage(
    message: Message,
    holidays: string[],
    holidayNames: string
  ): Promise<Document> {
    return http.post(RUUTER_ENDPOINTS.POST_MESSAGE, {
      message,
      holidays,
      holidayNames,
    });
  }

  sendNewSilentMessage(
    message: Message,
    holidays: string[],
    holidayNames: string
  ): Promise<Document> {
    return http.post(RUUTER_ENDPOINTS.POST_MESSAGE, {
      message,
      holidays,
      holidayNames,
      silent: true,
    });
  }

  sendMessagePreview({ chatId, content }: Message): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.POST_MESSAGE_PREVIEW, {
      chatId,
      content: content != "" ? "_" : "",
    });
  }

  redirectToBackoffice(
    message: Message,
    holidays: string[],
    holidayNames: string
  ): Promise<Document> {
    return http.post(RUUTER_ENDPOINTS.REDIRECT_TO_BACKOFFICE, {
      message,
      holidays,
      holidayNames,
    });
  }

  getMessages(): Promise<Message[]> {
    return http.get(RUUTER_ENDPOINTS.GET_MESSAGES_BY_CHAT_ID);
  }

  sendMessageWithRating(message: Message): Promise<Document> {
    return http.post(RUUTER_ENDPOINTS.SEND_MESSAGE_WITH_NEW_EVENT, message);
  }

  endChat(message: Message, status: string | null): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.END_CHAT, {
      message: message,
      status: status,
    });
  }

  getGreeting(): Promise<{ eng: string; est: string; isActive: boolean }> {
    return http.get(RUUTER_ENDPOINTS.GET_GREETING);
  }

  getEmergencyNotice(): Promise<EmergencyNoticeResponse> {
    return http.get(RUUTER_ENDPOINTS.GET_EMERGENCY_NOTICE);
  }

  getNewMessages(timeRangeBegin: string): Promise<Message[]> {
    return http.get(RUUTER_ENDPOINTS.GET_NEW_MESSAGES, {
      params: { timeRangeBegin: timeRangeBegin },
    });
  }

  get(): Promise<EmergencyNoticeResponse> {
    return http.get(RUUTER_ENDPOINTS.GET_EMERGENCY_NOTICE);
  }

  sendNpmRating({
    chatId,
    npmRating,
  }: {
    chatId: string;
    npmRating: number;
  }): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.SEND_NPM_RATING, {
      chatId,
      feedbackRating: npmRating,
    });
  }

  sendFeedbackMessage({
    userFeedback,
    chatId,
  }: {
    userFeedback: string;
    chatId: string;
  }): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.SEND_FEEDBACK_MESSAGE, {
      chatId,
      feedbackText: userFeedback,
    });
  }

  getEstimatedWaitingTime(chatId: string): Promise<EstimatedWaiting> {
    return http.post(RUUTER_ENDPOINTS.GET_WAITING_TIME, { chatId });
  }

  sendMessageWithNewEvent(message: Message): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.SEND_MESSAGE_WITH_NEW_EVENT, message);
  }

  removeChatForwardingValue(): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.REMOVE_CHAT_FORWARDING_VALUE);
  }

  generateForwardingRequest(): Promise<Chat[]> {
    return http.post(RUUTER_ENDPOINTS.GENERATE_FORWARDING_REQUEST);
  }

  generateDownloadChatRequest(
    chatId: string,
    email: string | null
  ): Promise<string> {
    return http.post(RUUTER_ENDPOINTS.DOWNLOAD_CHAT, { chatId, email });
  }

  sendAttachment(attachment: Attachment): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.SEND_ATTACHMENT, attachment);
  }

  sendUserContacts({
    chatId,
    endUserEmail,
    endUserPhone,
  }: UserContacts): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.SEND_CONTACT_INFO);
  }

  async getNameVisibility(): Promise<string> {
    return http.get(RUUTER_ENDPOINTS.GET_CSA_NAME_VISIBILITY);
  }

  getTitleVisibility(): Promise<string> {
    return http.get(RUUTER_ENDPOINTS.GET_CSA_TITLE_VISIBILITY);
  }

  addChatToTerminationQueue(chatId: string): void {
    // navigator.sendBeacon is the only reliable way to send a request when the page is being unloaded
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
    navigator.sendBeacon(
      `${window._env_.NOTIFICATION_NODE_URL}${RUUTER_ENDPOINTS.ADD_CHAT_TO_TERMINATION_QUEUE}`,
      JSON.stringify({ chatId })
    );
  }

  removeChatFromTerminationQueue(chatId: string): Promise<void> {
    return http.post(RUUTER_ENDPOINTS.REMOVE_CHAT_FROM_TERMINATION_QUEUE, {
      chatId,
    });
  }
}

export default new ChatService();
