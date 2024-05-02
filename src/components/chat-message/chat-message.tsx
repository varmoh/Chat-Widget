import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from '../../model/message-model';
import { AUTHOR_ROLES, CHAT_EVENTS } from '../../constants';
import AdminMessage from './message-types/admin-message';
import ClientMessage from './message-types/client-message';
import EventMessage from './message-types/event-message';
import AuthenticationMessage from './message-types/authentication-message';
import PermissionMessage from './message-types/permission-message';
import RedirectMessage from './message-types/redirect-message';

const ChatMessage = (props: { message: Message }): JSX.Element => {
  const { t } = useTranslation();
  const {
    message,
    message: { authorRole, event },
  } = props;

  const endChatMessage = useMemo(() => (
    <>
      <div>{t('notifications.chat-ended')}</div>
      <div>{t('notifications.chat-ended-new-chat')}</div>
    </>
  ),[]);

  if (authorRole === AUTHOR_ROLES.END_USER) return <ClientMessage message={message} />;

  switch (event) {
    case CHAT_EVENTS.MESSAGE_READ:
    case CHAT_EVENTS.USER_AUTHENTICATED:
      return <></>;
    case CHAT_EVENTS.ASK_PERMISSION_IGNORED:
      return <EventMessage content={t('notifications.ask-permission-ignored')} />;  
    case CHAT_EVENTS.ASK_PERMISSION_ACCEPTED:
      return <EventMessage content={t('notifications.ask-permission-accepted')} />;  
    case CHAT_EVENTS.ASK_PERMISSION_REJECTED:
      return <EventMessage content={t('notifications.ask-permission-rejected')} />;
    case CHAT_EVENTS.ASK_PERMISSION:
      return <EventMessage content={<PermissionMessage message={message} />} />;
    case CHAT_EVENTS.CONTACT_INFORMATION_REJECTED:
      return <EventMessage content={t('notifications.contact-information-rejected')} />;
    case CHAT_EVENTS.REQUESTED_AUTHENTICATION:
      return <EventMessage content={<AuthenticationMessage />} />;
    case CHAT_EVENTS.REDIRECTED:
      return <EventMessage content={t('notifications.chat-redirected')} />;
    case CHAT_EVENTS.ANSWERED:
    case CHAT_EVENTS.TERMINATED:
      return <EventMessage content={endChatMessage} />;
    case CHAT_EVENTS.CONTACT_INFORMATION:
      return <EventMessage content={t('notifications.contacts')} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD:
      return <EventMessage content={<RedirectMessage message={message} />} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD_ACCEPTED:
      return <EventMessage content={t('redirect.ask-permission-accepted')} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD_REJECTED:
      return <EventMessage content={t('redirect.ask-permission-rejected')} />;      
    case CHAT_EVENTS.CONTACT_INFORMATION_FULFILLED:
      return <ClientMessage message={message} />;
    default:
      return <AdminMessage aria-live="polite" message={message} />;
  }
};

export default ChatMessage;
