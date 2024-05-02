import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import {
  addMessage,
  clearMessageQueue,
  initChat,
  queueMessage,
  sendFeedbackMessage,
  sendMessagePreview,
  sendNewMessage,
  setFeedbackMessageGiven,
  setFeedbackWarning,
} from "../../slices/chat-slice";
import Send from "../../static/icons/send.svg";
import File from "../../static/icons/file.svg";
import styles from "./chat-keypad.module.scss";
import useChatSelector from "../../hooks/use-chat-selector";
import KeypadErrorMessage from "./keypad-error-message";
import ChatKeypadCharCounter from "./chat-keypad-char-counter";
import {
  AUTHOR_ROLES,
  CHAT_STATUS,
  MESSAGE_FILE_SIZE_LIMIT,
  MESSAGE_MAX_CHAR_LIMIT,
  MESSAGE_QUE_MAX_LENGTH,
  StyledButtonType,
} from "../../constants";
import {
  Message,
  Attachment,
  AttachmentTypes,
} from "../../model/message-model";
import StyledButton from "../styled-components/styled-button";
import Close from "../../static/icons/close.svg";
import formatBytes from "../../utils/format-bytes";
import debounce from "../../utils/debounce";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

const ChatKeyPad = (): JSX.Element => {
  const [userInput, setUserInput] = useState<string>("");
  const [userInputFile, setUserInputFile] = useState<Attachment>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isKeypadDisabled, setIsKeypadDisabled] = useState(false);
  const { feedback, chatId, loading, messageQueue, chatStatus } =
    useChatSelector();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    hiddenFileInputRef.current?.click();
  };
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const base64 = await handleFileRead(e.target.files[0]);

    if (!base64) return;

    setUserInput(e.target.files[0].name);
    setUserInputFile({
      chatId: chatId!,
      name: e.target.files[0].name,
      type: e.target.files[0].type as AttachmentTypes,
      size: e.target.files[0].size,
      base64: base64,
    });
  };

  const handleTextFeedback = () => {
    if (!feedback.isFeedbackRatingGiven) {
      dispatch(setFeedbackWarning(true));
      return;
    }
    dispatch(setFeedbackWarning(false));
    dispatch(sendFeedbackMessage({ userInput }));
    dispatch(setFeedbackMessageGiven(true));
    setIsKeypadDisabled(true);
  };
  useEffect(() => {
    if (messageQueue.length >= MESSAGE_QUE_MAX_LENGTH) {
      setIsKeypadDisabled(true);
    }
  }, [messageQueue]);

  useEffect(() => {
    if (chatId && !loading && messageQueue.length > 0) {
      messageQueue.forEach((message) => {
        setTimeout(() => {
          dispatch(sendNewMessage({ ...message, chatId }));
        }, 250);
      });
      dispatch(clearMessageQueue());
      setIsKeypadDisabled(false);
    }
  }, [chatId, dispatch, loading, messageQueue]);

  const isInputValid = () => {
    if (!userInput.trim()) return false;
    if (userInput.length >= MESSAGE_MAX_CHAR_LIMIT) {
      setErrorMessage(t("keypad.long-message-warning"));
      return false;
    }
    return true;
  };

  const addNewMessageToState = (): void => {
    if (!isInputValid()) return;
    const message: Message = {
      chatId,
      content: encodeURIComponent(userInput),
      file: userInputFile,
      authorTimestamp: new Date().toISOString(),
      authorRole: AUTHOR_ROLES.END_USER,
    };

    dispatch(addMessage(message));
    // dispatch(sendAttachment(userInputFile!)); // To be done: Send attachment
    handleUploadClear();

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

  const [previewSubject] = useState(() => new Subject<Message>());
  useEffect(() => {
    const subscription = previewSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap((message: Message) => {
          return dispatch(sendMessagePreview(message));
        })
      )
      .subscribe((_) => {});

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleKeyUp = useCallback(
    debounce(() => {
      const message: Message = {
        chatId,
        content: userInput,
        authorTimestamp: new Date().toISOString(),
      };

      if (chatId) {
        previewSubject.next(message);
      }
    }),
    [chatId, userInput]
  );

  const keypadClasses = classNames(styles.keypad);
  return (
    <div>
      <KeypadErrorMessage>{errorMessage}</KeypadErrorMessage>
      <div className={`${keypadClasses}`}>
        <input
          disabled={userInputFile ? true : isKeypadDisabled}
          aria-label={t("keypad.input.label")}
          className={`${styles.input}`}
          value={userInputFile ? userInputFile.name : userInput}
          placeholder={t("keypad.input.placeholder")}
          onChange={(e) => {
            setUserInput(e.target.value);
            setErrorMessage("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (chatStatus === CHAT_STATUS.ENDED && !!chatId)
                handleTextFeedback();
              else {
                event.preventDefault();
                addNewMessageToState();
              }
            }
          }}
          onKeyUp={handleKeyUp}
        />
        <input
          type="file"
          ref={hiddenFileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {chatStatus === CHAT_STATUS.ENDED && !!chatId ? (
          <FeedbackButtonStyle
            onClick={() => handleTextFeedback()}
            styleType={StyledButtonType.GRAY}
          >
            {t("chat.feedback.button.label")}
          </FeedbackButtonStyle>
        ) : (
          <>
            <button
              onKeyDown={addNewMessageToState}
              onClick={addNewMessageToState}
              className={styles.button}
              title={t("keypad.button.label")}
              aria-label={t("keypad.button.label")}
              tabIndex={0}
            >
              <img src={Send} alt="Send message icon" />
            </button>

            {userInputFile ? (
              <button
                onKeyDown={() => null}
                onClick={handleUploadClear}
                className={styles.button_cancelUpload}
                title={t("keypad.button.label")}
                aria-label={t("keypad.button.label")}
                tabIndex={0}
              >
                <img src={Close} alt="Close icon" />
              </button>
            ) : (
              <button
                onKeyDown={() => null}
                onClick={handleUploadClick}
                className={styles.button}
                title={t("keypad.button.label")}
                aria-label={t("keypad.button.label")}
                tabIndex={0}
              >
                <img src={File} alt="Send file icon" />
              </button>
            )}
          </>
        )}
      </div>
      <ChatKeypadCharCounter userInput={userInput} />
    </div>
  );

  async function handleFileRead(file: File): Promise<string | null> {
    if (!Object.values(AttachmentTypes).some((v) => v === file.type)) {
      setErrorMessage(`${file.type} file type is not supported`);
      return null;
    }

    if (file.size > MESSAGE_FILE_SIZE_LIMIT) {
      setErrorMessage(
        `Max allowed file size is ${formatBytes(MESSAGE_FILE_SIZE_LIMIT)}`
      );
      return null;
    } else {
      return await convertBase64(file);
    }
  }

  async function convertBase64(file: File): Promise<any> {
    return await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(new Error("Error reading file"));
      };
    });
  }

  function handleUploadClear() {
    setUserInputFile(undefined);
    setUserInput("");
    setErrorMessage("");
  }
};

const FeedbackButtonStyle = styled(StyledButton)`
  padding: 0.5rem 1rem;
`;

export default ChatKeyPad;
