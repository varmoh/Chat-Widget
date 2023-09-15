import { motion } from "framer-motion";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Resizable, ResizeCallback } from "re-resizable";
import useChatSelector from "../../hooks/use-chat-selector";
import {
  FEEDBACK_CONFIRMATION_TIMEOUT,
  CHAT_WINDOW_HEIGHT,
  CHAT_WINDOW_WIDTH,
  CHAT_EVENTS,
  IDLE_CHAT_INTERVAL,
  AUTHOR_ROLES,
} from "../../constants";
import ChatContent from "../chat-content/chat-content";
import ChatHeader from "../chat-header/chat-header";
import ChatKeyPad from "../chat-keypad/chat-keypad";
import ConfirmationModal from "../confirmation-modal/confirmation-modal";
import styles from "./chat.module.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  resetChatState,
  endChat,
  getGreeting,
  sendNewMessage,
  setChatDimensions,
  setIdleChat,
  setIsFeedbackConfirmationShown,
  sendMessagePreview,
} from "../../slices/chat-slice";
import WarningNotification from "../warning-notification/warning-notification";
import ChatFeedback from "../chat-feedback/chat-feedback";
import ChatFeedbackConfirmation from "../chat-feedback/chat-feedback-confirmation";
import EndUserContacts from "../end-user-contacts/end-user-contacts";
import WidgetDetails from "../chat-header/widget-details";
import useAuthenticationSelector from "../../hooks/use-authentication-selector";
import OnlineStatusNotification from "../online-status-notification/online-status-notification";
import IdleChatNotification from "../idle-chat-notification/idle-chat-notification";
import getIdleTime from "../../utils/getIdleTime";
import { Message } from "../../model/message-model";

const RESIZABLE_HANDLES = {
  topLeft: true,
  top: true,
  topRight: false,
  right: false,
  bottomRight: false,
  bottom: false,
  bottomLeft: false,
  left: true,
};

const Chat = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [submittingMessageRead, setSubmittingMessageRead] = useState(false);
  const [showWidgetDetails, setShowWidgetDetails] = useState(false);
  const [showFeedbackResult, setShowFeedbackResult] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthenticationSelector();
  const {
    isChatEnded,
    chatId,
    messageQueue,
    estimatedWaiting,
    idleChat,
    showContactForm,
    customerSupportId,
    feedback,
    messages,
    isChatOpen,
    chatDimensions,
  } = useChatSelector();
  const { burokrattOnlineStatus, showConfirmationModal } = useAppSelector(
    (state) => state.widget
  );

  useEffect(() => {
    if (
      feedback.isFeedbackRatingGiven &&
      feedback.isFeedbackMessageGiven &&
      !feedback.isFeedbackConfirmationShown
    ) {
      setShowFeedbackResult(true);
      setTimeout(async () => {
        dispatch(setIsFeedbackConfirmationShown(true));
        setShowFeedbackResult(false);
      }, FEEDBACK_CONFIRMATION_TIMEOUT);
    }
  }, [
    dispatch,
    feedback.isFeedbackConfirmationShown,
    feedback.isFeedbackMessageGiven,
    feedback.isFeedbackRatingGiven,
  ]);

  useEffect(() => {
    if (
      !chatId &&
      !feedback.isFeedbackConfirmationShown &&
      (!messages.length ||
        !messages.map((m) => m.event).includes(CHAT_EVENTS.GREETING))
    ) {
      dispatch(getGreeting());
    }
  }, [dispatch, chatId, feedback.isFeedbackConfirmationShown, messages]);

  const handleChatResize: ResizeCallback = (
    event,
    direction,
    elementRef,
    delta
  ) => {
    const newDimensions = {
      width: chatDimensions.width + delta.width,
      height: chatDimensions.height + delta.height,
    };
    dispatch(setChatDimensions(newDimensions));
  };

  useLayoutEffect(() => {
    if (isChatEnded === false) {
      if (messages.length > 0) {
        const interval = setInterval(() => {
          let lastActive;

          if (idleChat.lastActive === "") {
            lastActive = messages[messages.length - 1].authorTimestamp;
          } else {
            lastActive = idleChat.lastActive;
          }
          const differenceInSeconds = getIdleTime(lastActive);
          if (differenceInSeconds >= IDLE_CHAT_INTERVAL) {
            dispatch(setIdleChat({ isIdle: true }));
            if (showConfirmationModal) {
              dispatch(
                endChat({ event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS })
              );
            }
          }
        }, IDLE_CHAT_INTERVAL * 1000);
        return () => {
          clearInterval(interval);
        };
      }
    } else {
      if (feedback.isFeedbackConfirmationShown) {
        dispatch(resetChatState({ event: null }));
      }
    }
  }, [
    idleChat.isIdle,
    messages,
    showConfirmationModal,
    isChatEnded,
    feedback.isFeedbackConfirmationShown,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (chatId) {
        dispatch(
          endChat({ event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS })
        );
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        if (chatId) {
          dispatch(
            endChat({ event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS })
          );
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chatId]);

  useLayoutEffect(() => {
    if (
      !submittingMessageRead &&
      messages.length > 0 &&
      messages[messages.length - 1].authorRole === AUTHOR_ROLES.BACKOFFICE_USER
    ) {
      setSubmittingMessageRead(true);
      const message: Message = {
        chatId,
        content: CHAT_EVENTS.MESSAGE_READ,
        authorRole: AUTHOR_ROLES.END_USER,
        authorTimestamp: new Date().toISOString(),
        event: CHAT_EVENTS.MESSAGE_READ,
        preview: "",
      };
      dispatch(sendNewMessage(message)).then((_) => {
        setSubmittingMessageRead(false);
      });
    }
  }, [dispatch, messages]);

  return (
    <div className={styles.chatWrapper}>
      <Resizable
        size={chatDimensions}
        minWidth={CHAT_WINDOW_WIDTH}
        minHeight={CHAT_WINDOW_HEIGHT}
        enable={RESIZABLE_HANDLES}
        onResizeStop={handleChatResize}
      >
        <motion.div
          className={`${styles.chat} ${
            isAuthenticated ? styles.authenticated : ""
          }`}
          animate={{ y: 0 }}
          style={{ y: 400 }}
        >
          <ChatHeader
            isDetailSelected={showWidgetDetails}
            detailHandler={() => setShowWidgetDetails(!showWidgetDetails)}
          />
          {messageQueue.length >= 5 && (
            <WarningNotification warningMessage={t("chat.error-message")} />
          )}
          {burokrattOnlineStatus !== true && <OnlineStatusNotification />}
          {/* TODO: Needs fix - commented out because it's broken */}
          {/* {estimatedWaiting.time > 0 && estimatedWaiting.isActive && !showWidgetDetails && <WaitingTimeNotification/>} */}
          {showWidgetDetails && <WidgetDetails />}
          {!showWidgetDetails && showContactForm && <EndUserContacts />}
          {!showWidgetDetails && !showContactForm && <ChatContent />}
          {idleChat.isIdle && <IdleChatNotification />}
          {showFeedbackResult ? (
            <ChatFeedbackConfirmation />
          ) : (
            <>
              {!showWidgetDetails &&
                !showContactForm &&
                !feedback.isFeedbackConfirmationShown &&
                isChatEnded &&
                chatId && <ChatFeedback />}
              {!showWidgetDetails &&
                !showContactForm &&
                !feedback.isFeedbackConfirmationShown && <ChatKeyPad />}
              <ConfirmationModal />
            </>
          )}
        </motion.div>
      </Resizable>
    </div>
  );
};

export default memo(Chat);
