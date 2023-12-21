import React, { useMemo } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { Message } from "../../../model/message-model";
import styles from "../chat-message.module.scss";
import RobotIcon from "../../../static/icons/buerokratt.svg";
import {
  CHAT_EVENTS,
  MAXIMUM_MESSAGE_TEXT_LENGTH_FOR_ONE_ROW,
  RATING_TYPES,
} from "../../../constants";
import Linkifier from "./linkifier";
import Thumbs from "../../../static/icons/thumbs.svg";
import {
  sendMessageWithRating,
  updateMessage,
} from "../../../slices/chat-slice";
import { useAppDispatch } from "../../../store";
import ChatButtonGroup from "./chat-button-group";
import { parseButtons } from '../../../utils/chat-utils';
import useChatSelector from "../../../hooks/use-chat-selector";
import { stat } from "fs";


const leftAnimation = {
  animate: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: -20 },
  transition: { duration: 0.25, delay: 0.25 },
};

const AdminMessage = ({ message }: { message: Message }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { nameVisibility, titleVisibility } = useChatSelector();

  const setNewFeedbackRating = (newRating: string): void => {
    const updatedMessage = {
      ...message,
      rating: message.rating !== newRating ? newRating : "",
    };
    dispatch(updateMessage(updatedMessage));
    dispatch(sendMessageWithRating(updatedMessage));
  };

  const hasButtons = useMemo(() => {
    return parseButtons(message).length > 0;
  }, [message.buttons]);

  const csaName = (message.authorFirstName + ' ' + message.authorLastName).trim();

  return (
    <motion.div
      animate={leftAnimation.animate}
      initial={leftAnimation.initial}
      transition={leftAnimation.transition}
    >
      <div className={classNames(styles.message, styles.admin)}>
        {
          nameVisibility && csaName && (
            <div className={styles.name}>{csaName}</div>
          )
        }
        {
          titleVisibility && message.authorRole && (
            <div className={styles.name}>{message.authorRole}</div>
          )
        }
        <div className={styles.main}>
          <div className={styles.icon}>
            {message.event === CHAT_EVENTS.EMERGENCY_NOTICE ? (
              <div className={styles.emergency}>!</div>
            ) : (
              <img src={RobotIcon} alt="Robot icon" />
            )}
          </div>
          <div
            className={`${styles.content} ${
              message.event === CHAT_EVENTS.EMERGENCY_NOTICE &&
              styles.emergency_content
            }`}
          >
            <Linkifier message={decodeURIComponent(message.content ?? "")} />
          </div>
          <div
            className={classNames(
              styles.feedback,
              message.content?.length !== undefined &&
                message.content?.length >
                  MAXIMUM_MESSAGE_TEXT_LENGTH_FOR_ONE_ROW
                ? styles.column
                : styles.row
            )}
          >
            {![CHAT_EVENTS.GREETING, CHAT_EVENTS.EMERGENCY_NOTICE].includes(
              message.event as CHAT_EVENTS
            ) && !hasButtons && (
              <div>
                <button
                  type="button"
                  className={
                    message.rating === RATING_TYPES.LIKED
                      ? styles.highlight
                      : styles.grey
                  }
                  onClick={() => {
                    setNewFeedbackRating(RATING_TYPES.LIKED);
                  }}
                >
                  <img src={Thumbs} alt="thumbs up icon" />
                </button>
                <button
                  type="button"
                  className={
                    message.rating === RATING_TYPES.DISLIKED
                      ? styles.highlight
                      : styles.grey
                  }
                  onClick={() => {
                    setNewFeedbackRating(RATING_TYPES.DISLIKED);
                  }}
                >
                  <img
                    className={styles.thumbsDownImg}
                    src={Thumbs}
                    alt="thumbs down icon"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        {hasButtons && <ChatButtonGroup message={message} />}
      </div>
    </motion.div>
  );
};

export default AdminMessage;
