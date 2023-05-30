/* eslint-disable */
export const SESSION_STORAGE_CHAT_ID_KEY = 'byk-va-cid';
export const SESSION_STORAGE_TARA_LOGIN_REDIRECT = 'byk-va-tara-login-redirect';
export const OFFICE_HOURS_INTERVAL_TIMEOUT = 60000;
// BYK-648 enable to show customer service agent name in chat window
export const CLIENT_NAME_ENABLED = false;
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
export const IDLE_CHAT_INTERVAL = 30 * 60;
export const ONLINE_CHECK_INTERVAL = 30_000;
export const ONLINE_CHECK_INTERVAL_ACTIVE_CHAT = 10_000;
export const CHAT_BUBBLE_PROACTIVE_SECONDS = 3;
export const CHAT_SHOW_BUBBLE_MESSAGE = false;
export const CHAT_BUBBLE_MESSAGE_DELAY_SECONDS = 5;
export const CHAT_BUBBLE_COLOR = '#003CFF';
export const CHAT_BUBBLE_ANIMATION = 'shockwave';
export const IDLE_CHAT_INTERVAL = 30 * 60;

export enum CHAT_STATUS {
  ENDED = 'ENDED',
  OPEN = 'OPEN',
}

export enum CHAT_EVENTS {
  ANSWERED = 'answered',
  TERMINATED = 'terminated',
  CLIENT_LEFT = 'client-left',
  CLIENT_LEFT_WITH_ACCEPTED = 'client-left-with-accepted',
  CLIENT_LEFT_WITH_NO_RESOLUTION = 'client-left-with-no-resolution',
  CLIENT_LEFT_FOR_UNKNOWN_REASONS = 'client-left-for-unknown-reasons',
  EMERGENCY_NOTICE = 'emergency-notice',
  GREETING = 'greeting',
  RATING = 'rating',
  REQUESTED_AUTHENTICATION = 'requested-authentication',
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
}

export enum AUTHOR_ROLES {
  END_USER = 'end-user',
  BACKOFFICE_USER = 'backoffice-user',
}

export enum RUUTER_ENDPOINTS {
  INIT_CHAT = '/init-chat',
  GET_CHAT_BY_ID = '/get-chat-by-id',
  GET_WIDGET_CONFIG = '/get-widget-config',
  SEND_CONTACT_INFO = '/end-user-email-phone',
  AUTHENTICATE_USER = '/end-user-id-name',
  GET_NEW_MESSAGES = '/get-new-messages',
  POST_MESSAGE = '/post-message',
  POST_NEW_RATING = '/post-message-with-rating',
  GET_MESSAGES_BY_CHAT_ID = '/get-messages-by-chat-id',
  END_CHAT = '/end-chat',
  GET_GREETING = '/get-greeting-message',
  GET_EMERGENCY_NOTICE = '/get-emergency-notice',
  SEND_NPM_RATING = '/post-chat-feedback-rating',
  SEND_FEEDBACK_MESSAGE = '/post-chat-feedback-text',
  GET_WAITING_TIME = '/estimated-waiting-time',
  SEND_MESSAGE_WITH_NEW_EVENT = '/post-message-with-new-event',
  REMOVE_CHAT_FORWARDING_VALUE = '/remove-chat-forwarding-value',
  GENERATE_FORWARDING_REQUEST = '/origin-forward',
  BUROKRATT_ONLINE_STATUS = '/healthz',
  CUSTOM_JWT_EXTEND = '/custom-jwt-extend',
  CUSTOM_JWT_USERINFO = '/custom-jwt-userinfo',
  DOWNLOAD_CHAT = '/chat/download',
  SEND_ATTACHMENT= '/attachments/add'
  SEND_USER_CONTACTS = '/end-user-email-phone'
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
