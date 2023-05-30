import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Resizable, ResizeCallback } from 're-resizable';
import useChatSelector from '../../hooks/use-chat-selector';
import { FEEDBACK_CONFIRMATION_TIMEOUT, CHAT_WINDOW_HEIGHT, CHAT_WINDOW_WIDTH, CHAT_EVENTS } from '../../constants';
import ChatContent from '../chat-content/chat-content';
import ChatHeader from '../chat-header/chat-header';
import ChatKeyPad from '../chat-keypad/chat-keypad';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import styles from './chat.module.scss';
import { useAppDispatch } from '../../store';
import {
  getGreeting,
  setChatDimensions,
  setIsFeedbackConfirmationShown,
} from '../../slices/chat-slice';
import WarningNotification from '../warning-notification/warning-notification';
import ChatFeedback from '../chat-feedback/chat-feedback';
import ChatFeedbackConfirmation from '../chat-feedback/chat-feedback-confirmation';
import EndUserContacts from '../end-user-contacts/end-user-contacts';
import WidgetDetails from '../chat-header/widget-details';
import useAuthenticationSelector from '../../hooks/use-authentication-selector';

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
  const [showWidgetDetails, setShowWidgetDetails] = useState(false);
  const [showFeedbackResult, setShowFeedbackResult] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthenticationSelector();
  const {
    isChatEnded,
    chatId,
    messageQueue,
    showContactForm,
    feedback,
    messages,
    chatDimensions,
  } = useChatSelector();

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
      (!messages.length || !messages.map((m) => m.event).includes(CHAT_EVENTS.GREETING))
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
            isAuthenticated ? styles.authenticated : ''
          }`}
          style={{ y: 400 }}
          animate={{ y: 0 }}
        >
          <ChatHeader
            isDetailSelected={showWidgetDetails}
            detailHandler={() => setShowWidgetDetails(!showWidgetDetails)}
          />
          {messageQueue.length >= 5 && (
            <WarningNotification warningMessage={t('chat.error-message')} />
          )}
          {showWidgetDetails && <WidgetDetails />}
          {!showWidgetDetails && showContactForm && <EndUserContacts />}
          {!showWidgetDetails && !showContactForm && <ChatContent />}
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
