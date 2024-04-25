/* eslint-disable */
export const SESSION_STORAGE_CHAT_ID_KEY = 'byk-va-cid';
export const LOCAL_STORAGE_TARA_LOGIN_REDIRECT = 'byk-va-tara-login-redirect';
export const OFFICE_HOURS_INTERVAL_TIMEOUT = 60000;
// BYK-648 enable to show customer service agent name in chat window
export const EMAIL_REGEX =
  '^$|^[\\wöäüÖÄÜ!#$%&’*+\\/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+\\/=?`{|}~^-]+)*@(?:[a-zA-ZöäüÖÄÜ0-9-]+\\.)+[a-zA-ZöäüÖÄÜ]{2,6}$';
export const PHONE_NR_REGEX = '^$|^[+]*[0-9]{1,4}[-\\s.0-9]{6,15}$';
export const MESSAGE_MAX_CHAR_LIMIT = 3000;
export const MESSAGE_FILE_SIZE_LIMIT = 10_000_000;
export const MESSAGE_WARNING_LIMIT = 2900;
export const MESSAGE_VISIBILITY_LIMIT = 500;
export const MAXIMUM_MESSAGE_TEXT_LENGTH_FOR_ONE_ROW = 27;
export const FEEDBACK_CONFIRMATION_TIMEOUT = 5000;
export const FEEDBACK_MESSAGE_MAX_CHAR_LIMIT = 500;
export const FEEDBACK_MESSAGE_LIMIT_WARNING_AT = 400;
export const FEEDBACK_MESSAGE_LIMIT_VISIBILE_AT = 100;
export const MESSAGE_QUE_MAX_LENGTH = 5;
export const TERMS_AND_CONDITIONS_LINK =
  'https://www.kratid.ee/kasutustingimused';
export const ERROR_MESSAGE = 'An error has occured';
export const CHAT_WINDOW_WIDTH = 400;
export const CHAT_WINDOW_HEIGHT = 460;
export const LOCAL_STORAGE_CHAT_DIMENSIONS_KEY = 'chat-dimensions';
export const IDLE_CHAT_INTERVAL = 15 * 60;
export const IDLE_CHAT_CHOICES_INTERVAL = 60;
export const EXTEND_JWT_COOKIE_IN_MS = 30000;
export const ONLINE_CHECK_INTERVAL = 30_000;
export const ONLINE_CHECK_INTERVAL_ACTIVE_CHAT = 10_000;
export const CHAT_BUBBLE_PROACTIVE_SECONDS = 3;
export const CHAT_SHOW_BUBBLE_MESSAGE = false;
export const CHAT_BUBBLE_MESSAGE_DELAY_SECONDS = 5;
export const CHAT_BUBBLE_COLOR = '#003CFF';
export const CHAT_BUBBLE_ANIMATION = 'shockwave';
export const CHAT_INPUT_DEBOUNCE_TIMEOUT = 500;
export const CURRENT_COUNTRY = 'EE';

export enum CHAT_MODES {
  FLOW = 'flow',
  FREE = 'free',
}

export enum CHAT_STATUS {
  ENDED = 'ENDED',
  OPEN = 'OPEN',
}

export enum CHAT_EVENTS {
  ANSWERED = 'answered',
  TERMINATED = 'terminated',
  CLIENT_LEFT = 'client_left',
  CLIENT_LEFT_WITH_ACCEPTED = 'client_left_with_accepted',
  CLIENT_LEFT_WITH_NO_RESOLUTION = 'client_left_with_no_resolution',
  CLIENT_LEFT_FOR_UNKNOWN_REASONS = 'client_left_for_unknown_reasons',
  EMERGENCY_NOTICE = 'emergency-notice',
  GREETING = 'greeting',
  RATING = 'rating',
  REQUESTED_AUTHENTICATION = 'requested-authentication',
  USER_AUTHENTICATED = 'user-authenticated',
  ASK_PERMISSION = 'ask-permission',
  ASK_PERMISSION_ACCEPTED = 'ask-permission-accepted',
  ASK_PERMISSION_REJECTED = 'ask-permission-rejected',
  ASK_PERMISSION_IGNORED = 'ask-permission-ignored',
  REQUESTED_CHAT_FORWARD = 'requested-chat-forward',
  REQUESTED_CHAT_FORWARD_ACCEPTED = 'requested-chat-forward-accepted',
  REQUESTED_CHAT_FORWARD_REJECTED = 'requested-chat-forward-rejected',
  REDIRECTED = 'redirected',
  CONTACT_INFORMATION = 'contact-information',
  CONTACT_INFORMATION_FULFILLED = 'contact-information-fulfilled',
  CONTACT_INFORMATION_REJECTED = 'contact-information-rejected',
  UNAVAILABLE_CONTACT_INFORMATION_FULFILLED = 'unavailable-contact-information-fulfilled',
  CONTACT_INFORMATION_SKIPPED = 'contact-information-skipped',
  MESSAGE_READ = 'message-read',
  UNAVAILABLE_ORGANIZATION = 'unavailable_organization',
  UNAVAILABLE_CSAS = 'unavailable_csas',
  UNAVAILABLE_HOLIDAY = 'unavailable_holiday'
}

export enum TERMINATE_STATUS {
  CLIENT_LEFT_WITH_ACCEPTED = 'CLIENT_LEFT_WITH_ACCEPTED',
  CLIENT_LEFT_WITH_NO_RESOLUTION = 'CLIENT_LEFT_WITH_NO_RESOLUTION',
  CLIENT_LEFT_FOR_UNKNOWN_REASONS = 'CLIENT_LEFT_FOR_UNKNOWN_REASONS',
  ACCEPTED = 'ACCEPTED',
  HATE_SPEECH = 'HATE_SPEECH',
  OTHER = 'OTHER',
  RESPONSE_SENT_TO_CLIENT_EMAIL = 'RESPONSE_SENT_TO_CLIENT_EMAIL'
}

export enum AUTHOR_ROLES {
  END_USER = 'end-user',
  BACKOFFICE_USER = 'backoffice-user',
}

export enum RUUTER_ENDPOINTS {
  INIT_CHAT = '/chats/init',
  GET_CHAT_BY_ID = '/chats/get',
  GET_WIDGET_CONFIG = '/chats/config/widget',
  GET_AVAILABLE_CSAS = '/agents/available',
  SEND_CONTACT_INFO = '/chats/users/contact',
  AUTHENTICATE_USER = '/chats/users/name',
  GET_NEW_MESSAGES = '/chats/messages/new',
  POST_MESSAGE = '/chats/messages/add',
  POST_MESSAGE_PREVIEW = '/chats/messages/preview',
  GET_MESSAGES_BY_CHAT_ID = '/chats/messages/all',
  END_CHAT = '/chats/end',
  GET_GREETING = '/chats/greeting',
  GET_EMERGENCY_NOTICE = '/chats/config/emergency-notice',
  SEND_NPM_RATING = '/chats/feedbacks/rating',
  SEND_FEEDBACK_MESSAGE = '/chats/feedbacks/text',
  GET_WAITING_TIME = '/chats/estimated-waiting-time',
  SEND_MESSAGE_WITH_NEW_EVENT = '/chats/messages/event',
  REMOVE_CHAT_FORWARDING_VALUE = '/chats/forwards/remove',
  GENERATE_FORWARDING_REQUEST = '/chats/forwards/add',
  BUROKRATT_ONLINE_STATUS = '/healthz',
  CUSTOM_JWT_EXTEND = '/auth/jwt/extend',
  CUSTOM_JWT_USERINFO = '/auth/jwt/userinfo',
  DOWNLOAD_CHAT = '/chats/download',
  SEND_ATTACHMENT = '/attachments/add',
  GET_CSA_NAME_VISIBILITY = '/chats/config/name-visibility',
  GET_CSA_TITLE_VISIBILITY = '/chats/config/title-visibility',
  ADD_CHAT_TO_TERMINATION_QUEUE = '/add-chat-to-termination-queue',
  REMOVE_CHAT_FROM_TERMINATION_QUEUE = '/remove-chat-from-termination-queue',
  LOGIN_WITH_TARA = '/auth/tara/login',
}

export enum StyledButtonType {
  LIGHT = 'LIGHT',
  GRAY = 'GRAY',
  DARK = 'DARK',
}

export enum RATING_TYPES {
  LIKED = 'liked',
  DISLIKED = 'disliked',
}
