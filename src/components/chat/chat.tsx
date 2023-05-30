import { motion } from 'framer-motion';
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Resizable, ResizeCallback } from 're-resizable';
import useChatSelector from '../../hooks/use-chat-selector';
import { FEEDBACK_CONFIRMATION_TIMEOUT, CHAT_WINDOW_HEIGHT, CHAT_WINDOW_WIDTH, CHAT_EVENTS, IDLE_CHAT_INTERVAL } from '../../constants';
import ChatContent from '../chat-content/chat-content';
import ChatHeader from '../chat-header/chat-header';
import ChatKeyPad from '../chat-keypad/chat-keypad';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import styles from './chat.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  endChat,
  getEstimatedWaitingTime,
  getGreeting,
  setChatDimensions,
  setEstimatedWaitingTimeToZero,
  setIdleChat,
  setIsFeedbackConfirmationShown
} from '../../slices/chat-slice';
import WarningNotification from '../warning-notification/warning-notification';
import ChatFeedback from '../chat-feedback/chat-feedback';
import ChatFeedbackConfirmation from '../chat-feedback/chat-feedback-confirmation';
import EndUserContacts from '../end-user-contacts/end-user-contacts';
import WidgetDetails from '../chat-header/widget-details';
import useAuthenticationSelector from '../../hooks/use-authentication-selector';
import OnlineStatusNotification from '../online-status-notification/online-status-notification';
import IdleChatNotification from '../idle-chat-notification/idle-chat-notification';
import getIdleTime from '../../utils/getIdleTime';

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
  const { isChatEnded, chatId, messageQueue, estimatedWaiting, showContactForm, customerSupportId, feedback, messages, chatDimensions } = useChatSelector();
  const { burokrattOnlineStatus } = useAppSelector((state) => state.widget);

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

useLayoutEffect(() => {
  if (messages.length > 0 && !isChatEnded) {
    const interval = setInterval(() => {
    let lastActive;
      if(idleChat.lastActive === '') {
        lastActive = messages[messages.length - 1].authorTimestamp;
      } else {
        lastActive = idleChat.lastActive
      }
      const differenceInSeconds = getIdleTime(lastActive);
        if(differenceInSeconds > IDLE_CHAT_INTERVAL) {
          dispatch(setIdleChat({isIdle: true}));
        }

        if(differenceInSeconds > IDLE_CHAT_INTERVAL + 10) {
          dispatch(endChat({event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS}))
        }
    }, IDLE_CHAT_INTERVAL*1000);
    return () => {
      clearInterval(interval);
    }
  }
}, [idleChat.isIdle, messages]);

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
          animate={{ y: 0 }}
          style={{ y: 400 }}
        >
          <ChatHeader
            isDetailSelected={showWidgetDetails}
            detailHandler={() => setShowWidgetDetails(!showWidgetDetails)}
          />
          {messageQueue.length >= 5 && <WarningNotification warningMessage={t('chat.error-message')}/>}
          {burokrattOnlineStatus !== true && <OnlineStatusNotification/>}
          {estimatedWaiting.time > 0 && estimatedWaiting.isActive && !showWidgetDetails && <WaitingTimeNotification/>}
          {showWidgetDetails && <WidgetDetails/>}
          {!showWidgetDetails && showContactForm && <EndUserContacts/>}
          {!showWidgetDetails && !showContactForm && <ChatContent/>}
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
