import { ChatState } from './slices/chat-slice';
import { AuthenticationState } from './slices/authentication-slice';
import { Message } from './model/message-model';
import { CHAT_STATUS, CHAT_WINDOW_WIDTH, CHAT_WINDOW_HEIGHT, CHAT_BUBBLE_ANIMATION, CHAT_BUBBLE_COLOR, CHAT_BUBBLE_MESSAGE_DELAY_SECONDS, CHAT_BUBBLE_PROACTIVE_SECONDS, CHAT_SHOW_BUBBLE_MESSAGE, CHAT_MODES } from './constants';

export const initialChatState: ChatState = {
  endUserContacts: {
    idCode: '',
    mailAddress: '',
    phoneNr: '',
    comment: '',
  },
  errorMessage: '',
  chatId: null,
  chatDimensions: {
    width: CHAT_WINDOW_WIDTH,
    height: CHAT_WINDOW_HEIGHT
  },
  customerSupportId: '1',
  isChatOpen: false,
  showContactForm: false,
  showUnavailableContactForm: false,
  contactContentMessage: '',
  isChatRedirected: false,
  messages: [],
  messageQueue: [],
  eventMessagesToHandle: [],
  chatStatus: null,
  lastReadMessageTimestamp: null,
  contactMsgId: '',
  estimatedWaiting: {
    positionInUnassignedChats: '',
    durationInSeconds: '',
  },
  idleChat: {
    isIdle: false,
    lastActive: '',
  },
  loading: false,
  newMessagesAmount: 0,
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
    }
  },
  chatMode: CHAT_MODES.FREE,
  nameVisibility: false,
  titleVisibility: false,
};

export const initialAuthState: AuthenticationState = {
  fetchingUserInfo: true,
  loggedInWithTaraJwt: false,
  isAuthenticated: false,
  authenticationFailed: false,
  userInfo: {
    jwtExpirationTimestamp: '',
    firstName: '',
    lastName: '',
    personalCode: '',
  },
};

export const mockMessages: Message[] = [
  {
    chatId: 'id',
    content: 'hello world',
    authorTimestamp: '2022-03-09T10:25:31.519Z',
  },
];

export const mockMessage = {
  chatId: '123',
  content: 'Hello World',
  authorTimestamp: new Date().toISOString(),
};

export const mockMessage2 = {
  chatId: '321',
  content: 'bye',
  authorTimestamp: new Date().toISOString(),
};

export const mockChat = {
  id: '1',
  customerSupportId: '9',
  status: CHAT_STATUS.OPEN,
};
