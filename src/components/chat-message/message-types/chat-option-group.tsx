import React, { useMemo } from "react";
import { Message } from "../../../model/message-model";
import { AUTHOR_ROLES, CHAT_MODES } from "../../../constants";
import { useAppDispatch } from "../../../store";
import { addMessage, initChat, queueMessage, sendNewMessage } from "../../../slices/chat-slice";
import useChatSelector from "../../../hooks/use-chat-selector";
import { parseOptions } from "../../../utils/chat-utils";
import styles from "../chat-message.module.scss";

const ChatOptionGroup = ({ message }: { message: Message }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { chatId, loading, chatMode, messages } = useChatSelector();

  const parsedOptions = useMemo(() => {
    return parseOptions(message);
  }, [message.options]);

  const addNewMessageToState = (selectedOption: string): void => {
    const message: Message = {
      chatId: chatId ?? "",
      content: selectedOption,
      authorTimestamp: new Date().toISOString(),
      authorRole: AUTHOR_ROLES.END_USER,
    };

    dispatch(addMessage(message));

    if (!chatId && !loading) {
      dispatch(initChat(message));
    }
    if (loading) {
      dispatch(queueMessage(message));
    }
    if (chatId) {
      dispatch(sendNewMessage(message));
    }
  };

  const enabled = messages[messages.length - 1]?.id === message?.id;

  return (
    <div className={styles.buttonsRow}>
      {parsedOptions?.map(option => (
        <button
          key={option}
          type="button"
          className={`${styles["action-button"]} ${styles["action-option"]}`}
          onClick={() => addNewMessageToState(option)}
          disabled={!enabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChatOptionGroup;
