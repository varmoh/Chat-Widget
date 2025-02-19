import { UserContacts } from "./../model/user-contacts-model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attachment, Message } from "../model/message-model";
import ChatService from "../services/chat-service";
import {
  AUTHOR_ROLES,
  CHAT_EVENTS,
  CHAT_STATUS,
  ERROR_MESSAGE,
  SESSION_STORAGE_CHAT_ID_KEY,
  LOCAL_STORAGE_CHAT_DIMENSIONS_KEY,
  TERMINATE_STATUS,
  CHAT_MODES,
} from "../constants";
import { Chat } from "../model/chat-model";
import {
  clearStateVariablesFromLocalStorage,
  findMatchingMessageFromMessageList,
  getInitialChatDimensions,
} from "../utils/state-management-utils";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../utils/local-storage-utils";
import getHolidays from "../utils/holidays";
import {
  filterDuplicatMessages,
  getChatModeBasedOnLastMessage,
} from "../utils/chat-utils";
import {
  isChatAboutToBeTerminated,
  wasPageReloaded,
} from "../utils/browser-utils";

export interface EstimatedWaiting {
  positionInUnassignedChats: string;
  durationInSeconds: string;
}

export interface EndUserContacts {
  idCode: string;
  mailAddress: string;
  phoneNr: string;
  comment: string;
}

export interface ChatState {
  chatId: string | null;
  isChatOpen: boolean;
  chatStatus: CHAT_STATUS | null;
  chatDimensions: {
    width: number;
    height: number;
  };
  customerSupportId: string;
  lastReadMessageTimestamp: string | null;
  messages: Message[];
  messageQueue: Message[];
  newMessagesAmount: number;
  eventMessagesToHandle: Message[];
  errorMessage: string;
  estimatedWaiting: EstimatedWaiting;
  idleChat: {
    isIdle: boolean;
    lastActive: string;
  };
  loading: boolean;
  showContactForm: boolean;
  showUnavailableContactForm: boolean;
  showAskToForwardToCsaForm: boolean;
  askForContacts: boolean;
  contactMsgId: string;
  forwardToCsaMessage: string;
  forwardToCsaMessageId: string;
  contactContentMessage: string;
  isChatRedirected: boolean;
  feedback: {
    isFeedbackConfirmationShown: boolean;
    isFeedbackMessageGiven: boolean;
    isFeedbackRatingGiven: boolean;
    showFeedbackWarning: boolean;
  };
  endUserContacts: EndUserContacts;
  downloadChat: {
    isLoading: boolean;
    error: any;
    data: any;
  };
  emergencyNotice: {
    start: string;
    end: string;
    text: string;
    isVisible: boolean;
  } | null;
  contactForm: {
    data: UserContacts;
    state: {
      isLoading: boolean;
      isSubmitted: boolean;
      isFailed: boolean;
    };
  };
  chatMode: CHAT_MODES;
  nameVisibility: boolean;
  titleVisibility: boolean;
  showLoadingMessage: boolean;
  showResponseError: boolean;
  responseErrorMessage: string;
  failedMessages: Message[];
}

const initialEstimatedTime = {
  positionInUnassignedChats: "",
  durationInSeconds: "",
};

const initialState: ChatState = {
  chatId: null,
  isChatOpen: false,
  chatStatus: null,
  chatDimensions: getInitialChatDimensions(),
  customerSupportId: "",
  lastReadMessageTimestamp: null,
  messages: [],
  messageQueue: [],
  newMessagesAmount: 0,
  eventMessagesToHandle: [],
  errorMessage: "",
  showContactForm: false,
  showUnavailableContactForm: false,
  showAskToForwardToCsaForm: false,
  forwardToCsaMessageId: "",
  askForContacts: true,
  forwardToCsaMessage: "",
  contactContentMessage: "",
  isChatRedirected: false,
  estimatedWaiting: initialEstimatedTime,
  idleChat: {
    isIdle: false,
    lastActive: "",
  },
  loading: false,
  endUserContacts: {
    idCode: "",
    mailAddress: "",
    phoneNr: "",
    comment: "",
  },
  contactMsgId: "",
  feedback: {
    isFeedbackConfirmationShown: false,
    isFeedbackMessageGiven: false,
    isFeedbackRatingGiven: false,
    showFeedbackWarning: false,
  },
  downloadChat: {
    isLoading: false,
    error: false,
    data: null,
  },
  emergencyNotice: null,
  contactForm: {
    data: {
      chatId: null,
      endUserEmail: null,
      endUserPhone: null,
    },
    state: {
      isLoading: false,
      isSubmitted: false,
      isFailed: false,
    },
  },
  chatMode: CHAT_MODES.FREE,
  nameVisibility: false,
  titleVisibility: false,
  showLoadingMessage: false,
  showResponseError: false,
  responseErrorMessage: "",
  failedMessages: [],
};

export const initChat = createAsyncThunk(
  "chat/init",
  async (message: Message) => {
    const { holidays, holidayNames } = getHolidays();
    return ChatService.init(
      message,
      {
        endUserUrl: window.location.href.toString(),
        endUserOs: navigator.userAgent.toString(),
      },
      holidays,
      holidayNames
    );
  }
);

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (_args, thunkApi) => {
    const {
      chat: { chatId },
    } = thunkApi.getState() as { chat: ChatState };
    if (chatId) return ChatService.getChatById();
    return null;
  }
);

export const getChatMessages = createAsyncThunk(
  "chat/getChatMessages",
  async (args, thunkApi) => {
    const {
      chat: { chatId },
    } = thunkApi.getState() as { chat: ChatState };
    return chatId ? ChatService.getMessages() : null;
  }
);

export const getNewMessages = createAsyncThunk(
  "chat/getNewMessages",
  async (args: { timeRangeBegin: string }, _) => {
    return ChatService.getNewMessages(args.timeRangeBegin);
  }
);

export const sendChatNpmRating = createAsyncThunk(
  "chat/sendChatNpmRating",
  (args: { NpmRating: number }, thunkApi) => {
    const {
      chat: { chatId },
    } = (thunkApi.getState() as { chat: ChatState }) || "";
    if (chatId === null) return;
    ChatService.sendNpmRating({ chatId, npmRating: args.NpmRating });
  }
);

export const sendFeedbackMessage = createAsyncThunk(
  "chat/sendFeedbackMessage",
  (args: { userInput: string }, thunkApi) => {
    const {
      chat: { chatId },
    } = (thunkApi.getState() as { chat: ChatState }) || "";
    if (chatId === null) return;
    ChatService.sendFeedbackMessage({ chatId, userFeedback: args.userInput });
  }
);

export const endChat = createAsyncThunk(
  "chat/endChat",
  async (
    args: { event: CHAT_EVENTS | null; isUpperCase: boolean },
    thunkApi
  ) => {
    const {
      chat: { chatStatus, chatId },
    } = thunkApi.getState() as { chat: ChatState };
    thunkApi.dispatch(resetState());

    const endEvent = args.isUpperCase
      ? args.event?.toUpperCase()
      : args.event ?? "";
    let chatServiceStatus = null;
    if (endEvent === CHAT_EVENTS.UNAVAILABLE_CONTACT_INFORMATION_FULFILLED) {
      chatServiceStatus = "IDLE";
    }

    return chatStatus === CHAT_STATUS.ENDED
      ? null
      : ChatService.endChat(
          {
            chatId,
            authorTimestamp: new Date().toISOString(),
            authorRole: AUTHOR_ROLES.END_USER,
            event: endEvent,
          },
          chatServiceStatus ?? "ENDED"
        );
  }
);

export const addChatToTerminationQueue = createAsyncThunk(
  "addChatToTerminationQueue",
  async (args, thunkApi) => {
    const { chat } = thunkApi.getState() as { chat: ChatState };

    sessionStorage.setItem("terminationTime", Date.now().toString());
    localStorage.setItem("previousChatId", chat.chatId ?? "");

    thunkApi.dispatch(resetState());

    if (chat.chatId) {
      return ChatService.addChatToTerminationQueue(chat.chatId);
    }
  }
);

export const removeChatFromTerminationQueue = createAsyncThunk(
  "chat/removeChatFromTerminationQueue",
  async (args, thunkApi) => {
    if (!wasPageReloaded() || !isChatAboutToBeTerminated()) {
      return null;
    }

    const chatId = localStorage.getItem("previousChatId");
    setToLocalStorage(SESSION_STORAGE_CHAT_ID_KEY, chatId);
    sessionStorage.removeItem("terminationTime");

    if (chatId) {
      thunkApi.dispatch(resetStateWithValue(chatId));
      return ChatService.removeChatFromTerminationQueue(chatId);
    }
  }
);

export const resetChatState = createAsyncThunk(
  "",
  async (args: { event: CHAT_EVENTS | null }, thunkApi) => {
    const {
      chat: { chatStatus, chatId },
    } = thunkApi.getState() as { chat: ChatState };
    thunkApi.dispatch(resetState());

    const resetEvent = args.event?.toUpperCase();
    let chatServiceStatus = null;
    if (resetEvent === CHAT_EVENTS.UNAVAILABLE_CONTACT_INFORMATION_FULFILLED) {
      chatServiceStatus = "IDLE";
    }

    return chatStatus === CHAT_STATUS.ENDED
      ? null
      : ChatService.endChat(
          {
            chatId,
            authorTimestamp: new Date().toISOString(),
            authorRole: AUTHOR_ROLES.END_USER,
            event: resetEvent,
          },
          chatServiceStatus ?? "ENDED"
        );
  }
);

export const sendMessageWithRating = createAsyncThunk(
  "chat/sendMessageWithRating",
  async (message: Message) => ChatService.sendMessageWithRating(message)
);

export const sendMessageWithNewEvent = createAsyncThunk(
  "chat/sendMessageWithNewEvent",
  (message: Message) => ChatService.sendMessageWithNewEvent(message)
);

export const sendUserContacts = createAsyncThunk(
  "chat/sendUserContacts",
  (args: UserContacts) => {
    ChatService.sendUserContacts(args);
  }
);

export const getGreeting = createAsyncThunk("chat/getGreeting", async () =>
  ChatService.getGreeting()
);

export const getEmergencyNotice = createAsyncThunk(
  "chat/getEmergencyNotice",
  async () => ChatService.getEmergencyNotice()
);

export const sendNewMessage = createAsyncThunk(
  "chat/sendNewMessage",
  (message: Message) => {
    const { holidays, holidayNames } = getHolidays();
    return ChatService.sendNewMessage(message, holidays, holidayNames);
  }
);

export const sendNewSilentMessage = createAsyncThunk(
  "chat/sendNewSilentMessage",
  (message: Message) => {
    const { holidays, holidayNames } = getHolidays();
    return ChatService.sendNewSilentMessage(message, holidays, holidayNames);
  }
);

export const redirectToBackoffice = createAsyncThunk(
  "chat/forwards/forward-to-backoffice",
  (message: Message) => {
    const { holidays, holidayNames } = getHolidays();
    return ChatService.redirectToBackoffice(message, holidays, holidayNames);
  }
);

export const sendMessagePreview = createAsyncThunk(
  "chat/postMessagePreview",
  (message: Message) => ChatService.sendMessagePreview(message)
);

export const getEstimatedWaitingTime = createAsyncThunk(
  "chat/getEstimatedWaitingTime",
  async (_args, thunkApi) => {
    const {
      chat: { chatId },
    } = (thunkApi.getState() as { chat: ChatState }) || "";

    return chatId
      ? ChatService.getEstimatedWaitingTime(chatId)
      : initialEstimatedTime;
  }
);

export const removeChatForwardingValue = createAsyncThunk(
  "chat/removeChatForwardingValue",
  async () => ChatService.removeChatForwardingValue()
);

export const generateForwardingRequest = createAsyncThunk(
  "chat/generateForwardingRequest",
  async () => ChatService.generateForwardingRequest()
);
export const sendAttachment = createAsyncThunk(
  "chat/sendAttachment",
  async (attachment: Attachment) => ChatService.sendAttachment(attachment)
);
export const downloadChat = createAsyncThunk(
  "chat/downloadChat",
  async (isForwardToEmail: boolean, thunkApi) => {
    const {
      chat: { chatId, endUserContacts },
    } = thunkApi.getState() as { chat: ChatState };
    const isForwardToEmailAddress = isForwardToEmail
      ? endUserContacts.mailAddress
      : null;
    return chatId
      ? ChatService.generateDownloadChatRequest(chatId, isForwardToEmailAddress)
      : null;
  }
);
export const getNameVisibility = createAsyncThunk(
  "chat/getNameVisibility",
  async () => ChatService.getNameVisibility()
);
export const getTitleVisibility = createAsyncThunk(
  "chat/getTitleVisibility",
  async () => ChatService.getTitleVisibility()
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetState: () => initialState,
    resetStateWithValue: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    setChatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = filterDuplicatMessages([
        ...state.messages,
        action.payload,
      ]);
    },
    addMessageToTop: (state, action: PayloadAction<Message>) => {
      state.messages = [action.payload, ...state.messages];
    },
    setIsChatOpen: (state, action: PayloadAction<boolean>) => {
      state.chatId = getFromLocalStorage(SESSION_STORAGE_CHAT_ID_KEY);
      state.isChatOpen = action.payload;
      state.newMessagesAmount = 0;
    },
    setChatDimensions: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.chatDimensions = action.payload;
      setToLocalStorage(LOCAL_STORAGE_CHAT_DIMENSIONS_KEY, action.payload);
    },
    clearMessageQueue: (state) => {
      state.messageQueue = [];
    },
    setFeedbackMessageGiven: (state, action: PayloadAction<boolean>) => {
      state.feedback.isFeedbackMessageGiven = action.payload;
    },
    setFeedbackRatingGiven: (state, action: PayloadAction<boolean>) => {
      state.feedback.isFeedbackRatingGiven = action.payload;
      state.feedback.showFeedbackWarning = false;
    },
    setFeedbackWarning: (state, action: PayloadAction<boolean>) => {
      state.feedback.showFeedbackWarning = action.payload;
    },
    setShowContactForm: (state, action: PayloadAction<boolean>) => {
      state.showContactForm = action.payload;
    },
    setShowUnavailableContactForm: (state, action: PayloadAction<boolean>) => {
      state.showUnavailableContactForm = action.payload;
    },
    setShowAskToForwardToCsaForm: (state, action: PayloadAction<boolean>) => {
      state.showAskToForwardToCsaForm = action.payload;
    },
    queueMessage: (state, action: PayloadAction<Message>) => {
      state.messageQueue.push(action.payload);
    },
    resetNewMessagesAmount: (state) => {
      state.newMessagesAmount = 0;
    },
    setResponseErrorMessage: (state, action: PayloadAction<string>) => {
      state.responseErrorMessage = action.payload;
    },
    setShowErrorMessage: (state, action: PayloadAction<boolean>) => {
      state.showResponseError = action.payload;
      if (!action.payload) {
        state.responseErrorMessage = "";
      }
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      state.messages = state.messages.map((message) =>
        message.id === action.payload.id ? action.payload : message
      );
    },
    setIsFeedbackConfirmationShown: (state, action: PayloadAction<boolean>) => {
      state.feedback.isFeedbackConfirmationShown = action.payload;
    },
    setEstimatedWaitingTimeToZero: (state) => {
      state.estimatedWaiting.durationInSeconds = "";
      state.estimatedWaiting.positionInUnassignedChats = "";
    },
    setIdleChat: (state, action) => {
      state.idleChat = {
        ...state.idleChat,
        ...action.payload,
      };
    },
    setEmailAdress: (state, action) => {
      state.endUserContacts.mailAddress = action.payload;
    },
    setContactFormComment: (state, action) => {
      state.endUserContacts.comment = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.endUserContacts.phoneNr = action.payload;
    },
    setChat: (state, action: PayloadAction<Chat>) => {
      if (action.payload) {
        state.chatStatus = action.payload.status as CHAT_STATUS;
        state.customerSupportId = action.payload.customerSupportId;
      }
    },
    removeMessageFromDisplay: (state, action: PayloadAction<Message>) => {
      state.failedMessages = state.failedMessages.filter(
        (failedMessage) =>
          failedMessage.authorTimestamp !== action.payload.authorTimestamp
      );
      state.messages = state.messages.filter(
        (message) => message.authorTimestamp !== action.payload.authorTimestamp
      );
    },
    addMessagesToDisplay: (state, action: PayloadAction<Message[]>) => {
      let receivedMessages = action.payload || [];
      if (!receivedMessages.length) return;

      let messageEdited = false;

      const newMessagesList = state.messages.map((existingMessage) => {
        const matchingMessage = findMatchingMessageFromMessageList(
          existingMessage,
          receivedMessages
        );
        if (!matchingMessage) return existingMessage;
        receivedMessages = receivedMessages.filter(
          (rMsg) => rMsg.id !== matchingMessage.id
        );
        return { ...existingMessage, ...matchingMessage };
      });

      // Handle edited messages
      receivedMessages.forEach((receivedMessage) => {
        if (receivedMessage.originalBaseId) {
          const indexToReplace = state.messages.findIndex(
            (message) => message.id === receivedMessage.originalBaseId
          );

          if (indexToReplace !== -1) {
            newMessagesList[indexToReplace] = {
              ...state.messages[indexToReplace],
              ...receivedMessage,
            };

            messageEdited = true;

            receivedMessages = receivedMessages.filter(
              (msg) => msg.id !== receivedMessage.id
            );
          }
        }
      });

      if (
        !messageEdited &&
        newMessagesList.length + receivedMessages.length ===
          state.messages.length
      ) {
        return;
      }

      state.lastReadMessageTimestamp = new Date().toISOString();
      state.newMessagesAmount += receivedMessages.length;
      state.messages = filterDuplicatMessages([
        ...newMessagesList,
        ...receivedMessages,
      ]);
      setToLocalStorage("newMessagesAmount", state.newMessagesAmount);

      state.chatMode = getChatModeBasedOnLastMessage(state.messages);
    },
    handleStateChangingEventMessages: (
      state,
      action: PayloadAction<Message[]>
    ) => {
      action.payload.forEach((msg) => {
        switch (msg.event) {
          case CHAT_EVENTS.ASK_PERMISSION_IGNORED:
            state.messages = state.messages.map((message) =>
              message.id === msg.id ? msg : message
            );
            break;
          case CHAT_EVENTS.CONTACT_INFORMATION:
            state.showContactForm = true;
            state.contactMsgId = msg.id ?? "";
            break;
          case CHAT_EVENTS.UNAVAILABLE_HOLIDAY_ASK_CONTACTS:
          case CHAT_EVENTS.UNAVAILABLE_CSAS_ASK_CONTACTS:
          case CHAT_EVENTS.UNAVAILABLE_ORGANIZATION_ASK_CONTACTS:
            state.askForContacts = true;
            state.showUnavailableContactForm = true;
            state.contactMsgId = msg.id ?? "";
            state.contactContentMessage = msg.content ?? "";
            break;
          case CHAT_EVENTS.UNAVAILABLE_HOLIDAY:
          case CHAT_EVENTS.UNAVAILABLE_CSAS:
          case CHAT_EVENTS.UNAVAILABLE_ORGANIZATION:
            state.askForContacts = false;
            state.showUnavailableContactForm = true;
            state.contactMsgId = msg.id ?? "";
            state.contactContentMessage = msg.content ?? "";
            break;
          case CHAT_EVENTS.ASK_TO_FORWARD_TO_CSA:
            state.showAskToForwardToCsaForm = true;
            state.forwardToCsaMessageId = msg.id ?? "";
            state.forwardToCsaMessage = msg.content ?? "";
            break;
          case CHAT_EVENTS.APPROVED_VALIDATION:
            state.messages = state.messages.map((message) =>
              message.id === msg.id
                ? {
                    ...message,
                    content: msg.content,
                    event: CHAT_EVENTS.APPROVED_VALIDATION,
                  }
                : message
            );
            break;
          case CHAT_EVENTS.ANSWERED:
          case CHAT_EVENTS.TERMINATED:
          case TERMINATE_STATUS.ACCEPTED:
          case TERMINATE_STATUS.CLIENT_LEFT_FOR_UNKNOWN_REASONS:
          case TERMINATE_STATUS.HATE_SPEECH:
          case TERMINATE_STATUS.CLIENT_LEFT_WITH_ACCEPTED:
          case TERMINATE_STATUS.CLIENT_LEFT_WITH_NO_RESOLUTION:
          case TERMINATE_STATUS.OTHER:
          case TERMINATE_STATUS.RESPONSE_SENT_TO_CLIENT_EMAIL:
            clearStateVariablesFromLocalStorage();
            state.chatStatus = CHAT_STATUS.ENDED;
            break;
          default:
        }
      });
    },
    removeEstimatedWaitingMessage: (state) => {
      const estimatedMsgIndex = state.messages.findIndex(
        (msg) => msg.id === "estimatedWaiting"
      );
      if (estimatedMsgIndex === -1) return;
      state.messages[estimatedMsgIndex].content = "hidden";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initChat.pending, (state) => {
      state.lastReadMessageTimestamp = new Date().toISOString();
      state.loading = true;
      state.showLoadingMessage = true;
    });
    builder.addCase(initChat.fulfilled, (state, action) => {
      state.chatId = action.payload.id;
      state.loading = false;
      state.chatStatus = CHAT_STATUS.OPEN;
      state.showLoadingMessage = false;
    });
    builder.addCase(initChat.rejected, (state, action) => {
      state.showLoadingMessage = false;
      state.showResponseError = true;
      state.failedMessages.push(action.meta.arg);
      if (action.error.message?.includes("code 420")) {
        state.responseErrorMessage = "widget.error.botError";
      } else {
        state.responseErrorMessage = "widget.error.technicalProblems";
      }
    });
    builder.addCase(sendNewMessage.pending, (state) => {
      if (state.customerSupportId === "chatbot") {
        state.showLoadingMessage = true;
      }
    });
    builder.addCase(sendNewMessage.fulfilled, (state) => {
      state.showLoadingMessage = false;
    });
    builder.addCase(sendNewMessage.rejected, (state, action) => {
      state.showLoadingMessage = false;
      state.showResponseError = true;
      state.failedMessages.push(action.meta.arg);
      if (action.error.message?.includes("code 420")) {
        state.responseErrorMessage = "widget.error.botError";
      } else {
        state.responseErrorMessage = "widget.error.technicalProblems";
      }
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.chatStatus = action.payload.status as CHAT_STATUS;
      state.customerSupportId = action.payload.customerSupportId;
    });
    builder.addCase(getChatMessages.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.lastReadMessageTimestamp = new Date().toISOString();
      state.messages = filterDuplicatMessages(action.payload);

      state.chatMode = getChatModeBasedOnLastMessage(state.messages);
    });
    builder.addCase(getGreeting.fulfilled, (state, action) => {
      if (!action.payload.isActive) return;
      state.messages.push({
        content: action.payload.est.replaceAll(/\\n/g, "\n"),
        chatId: null,
        event: "greeting",
        authorTimestamp: new Date().toISOString(),
      });
    });
    builder.addCase(getNameVisibility.fulfilled, (state, action) => {
      state.nameVisibility = action.payload === "true";
    });
    builder.addCase(getTitleVisibility.fulfilled, (state, action) => {
      state.titleVisibility = action.payload === "true";
    });
    builder.addCase(getEmergencyNotice.fulfilled, (state, action) => {
      state.emergencyNotice = {
        start: action.payload.emergencyNoticeStartISO,
        end: action.payload.emergencyNoticeEndISO,
        text: action.payload.emergencyNoticeText,
        isVisible: action.payload.isEmergencyNoticeVisible === "true",
      };
    });
    builder.addCase(endChat.fulfilled, (state) => {
      state.chatStatus = CHAT_STATUS.ENDED;
      state.feedback.isFeedbackMessageGiven = false;
      state.feedback.isFeedbackRatingGiven = false;
      clearStateVariablesFromLocalStorage();
      localStorage.removeItem("previousChatId");
    });
    builder.addCase(addChatToTerminationQueue.fulfilled, (state) => {
      state.chatStatus = CHAT_STATUS.ENDED;
      state.feedback.isFeedbackMessageGiven = false;
      state.feedback.isFeedbackRatingGiven = false;
      clearStateVariablesFromLocalStorage();
    });
    builder.addCase(sendChatNpmRating.rejected, (state) => {
      state.errorMessage = ERROR_MESSAGE;
    });
    builder.addCase(sendFeedbackMessage.rejected, (state) => {
      state.errorMessage = ERROR_MESSAGE;
    });
    builder.addCase(getEstimatedWaitingTime.fulfilled, (state, action) => {
      state.estimatedWaiting = action.payload;

      const estimatedMsg = state.messages.find(
        (msg) => msg.id === "estimatedWaiting"
      );
      if (estimatedMsg) return;

      state.messages.push({
        id: "estimatedWaiting",
        chatId: "estimatedWaiting",
        authorTimestamp: new Date().toISOString(),
      });
    });
    builder.addCase(generateForwardingRequest.fulfilled, (state, action) => {
      if (action.payload[0].externalId) {
        state.chatId = action.payload[0].externalId;
        state.isChatRedirected = true;
      }
    });
    builder.addCase(downloadChat.pending, (state) => {
      state.downloadChat.isLoading = true;
    });
    builder.addCase(downloadChat.fulfilled, (state, action) => {
      state.downloadChat.isLoading = false;
      state.downloadChat.error = false;
      state.downloadChat.data = action.payload;
    });
    builder.addCase(downloadChat.rejected, (state, action) => {
      state.downloadChat.isLoading = false;
      state.downloadChat.error = action.error;
    });

    builder.addCase(sendUserContacts.pending, (state) => {
      state.contactForm.state.isLoading = true;
    });
    builder.addCase(sendUserContacts.fulfilled, (state, action) => {
      state.contactForm.state.isLoading = false;
      state.contactForm.state.isSubmitted = true;
    });
    builder.addCase(sendUserContacts.rejected, (state, action) => {
      state.contactForm.state.isLoading = false;
      state.contactForm.state.isFailed = true;
      state.contactForm.state.isSubmitted = false;
    });
  },
});

export const {
  addMessage,
  addMessageToTop,
  setChatId,
  setIsChatOpen,
  setChatDimensions,
  resetState,
  clearMessageQueue,
  queueMessage,
  updateMessage,
  setFeedbackMessageGiven,
  setFeedbackRatingGiven,
  setFeedbackWarning,
  resetNewMessagesAmount,
  setPhoneNumber,
  setIsFeedbackConfirmationShown,
  setShowErrorMessage,
  setResponseErrorMessage,
  setEmailAdress,
  setContactFormComment,
  setShowContactForm,
  setShowUnavailableContactForm,
  setShowAskToForwardToCsaForm,
  setEstimatedWaitingTimeToZero,
  setIdleChat,
  setChat,
  removeMessageFromDisplay,
  addMessagesToDisplay,
  handleStateChangingEventMessages,
  resetStateWithValue,
  removeEstimatedWaitingMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
