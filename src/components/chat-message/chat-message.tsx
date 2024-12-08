import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Message } from "../../model/message-model";
import { AUTHOR_ROLES, CHAT_EVENTS } from "../../constants";
import AdminMessage from "./message-types/admin-message";
import ClientMessage from "./message-types/client-message";
import EventMessage from "./message-types/event-message";
import AuthenticationMessage from "./message-types/authentication-message";
import PermissionMessage from "./message-types/permission-message";
import RedirectMessage from "./message-types/redirect-message";
import { parseButtons } from "../../utils/chat-utils";

const ChatMessage = (props: { message: Message, previousMessage?: Message }): JSX.Element => {
  const { t } = useTranslation();
  const {
    message,
    message: { authorRole, event },
    previousMessage,
  } = props;

  const endChatMessage = useMemo(
    () => (
      <>
        <div>{t("notifications.chat-ended")}</div>
        <div>{t("notifications.chat-ended-new-chat")}</div>
      </>
    ),
    []
  );

  if(authorRole === AUTHOR_ROLES.END_USER && previousMessage && previousMessage.authorRole !== AUTHOR_ROLES.END_USER && previousMessage?.buttons) {
    const selectedButton = parseButtons(previousMessage).find(x => x.payload === message.content);
    if(selectedButton)
      return <ClientMessage content={selectedButton.title} />
  }

  switch (event) {
    case CHAT_EVENTS.MESSAGE_READ:
    case CHAT_EVENTS.USER_AUTHENTICATED:
      return <></>;
    case CHAT_EVENTS.ASK_PERMISSION_IGNORED:
      return <EventMessage content={t("notifications.ask-permission-ignored")} />;
    case CHAT_EVENTS.ASK_PERMISSION_ACCEPTED:
      return <EventMessage content={t("notifications.ask-permission-accepted")} />;
    case CHAT_EVENTS.ASK_PERMISSION_REJECTED:
      return <EventMessage content={t("notifications.ask-permission-rejected")} />;
    case CHAT_EVENTS.ASK_PERMISSION:
      return <EventMessage content={<PermissionMessage message={message} />} />;
    case CHAT_EVENTS.CONTACT_INFORMATION_REJECTED:
      return <EventMessage content={t("notifications.contact-information-rejected")} />;
    case CHAT_EVENTS.REQUESTED_AUTHENTICATION:
      return <EventMessage content={<AuthenticationMessage />} />;
    case CHAT_EVENTS.REDIRECTED:
      return <EventMessage content={t("notifications.chat-redirected")} />;
    case CHAT_EVENTS.TAKEN_OVER:
      return <EventMessage content={t("notifications.human-took-over")} />;
    case CHAT_EVENTS.ANSWERED:
    case CHAT_EVENTS.TERMINATED:
      return <EventMessage content={endChatMessage} />;
    case CHAT_EVENTS.CONTACT_INFORMATION:
      return <EventMessage content={t("notifications.contacts")} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD:
      return <EventMessage content={<RedirectMessage message={message} />} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD_ACCEPTED:
      return <EventMessage content={t("redirect.ask-permission-accepted")} />;
    case CHAT_EVENTS.REQUESTED_CHAT_FORWARD_REJECTED:
      return <EventMessage content={t("redirect.ask-permission-rejected")} />;
    case CHAT_EVENTS.ASK_TO_FORWARD_TO_CSA:
      return <EventMessage content={t("notifications.ask_to_forward_to_csa")} />;
    case CHAT_EVENTS.FORWARDED_TO_BACKOFFICE:
      return <EventMessage content={t("notifications.forwarded_to_backoffice")} />;
    case CHAT_EVENTS.CONTINUE_CHATTING_WITH_BOT:
      return <EventMessage content={t("notifications.continue_chatting_with_bot")} />;
    case CHAT_EVENTS.CONTACT_INFORMATION_FULFILLED:
      return <ClientMessage message={message} />;
    case CHAT_EVENTS.WAITING_VALIDATION:
      const waitingValidationMessage = { ...message, content: `_${t("notifications.waiting_validation")}_` };
      return <AdminMessage message={waitingValidationMessage} />;
    default:
      if (authorRole === AUTHOR_ROLES.END_USER) {
        return <ClientMessage message={message} />;
      } else {
        return <AdminMessage aria-live="polite" message={message} />;
      }
  }
};

export default ChatMessage;
