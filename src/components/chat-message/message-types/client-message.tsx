import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import classNames from "classnames";
import {Message} from "../../../model/message-model";
import OutlineError from "../../../static/icons/outline-error.svg";
import PersonIcon from "../../../static/icons/person.svg";
import Markdownify from "./Markdownify";
import Button from "../../button";
import formatBytes from "../../../utils/format-bytes";
import File from "../../../static/icons/file.svg";
import {
  addMessage,
  removeMessageFromDisplay,
  sendNewMessage,
} from "../../../slices/chat-slice";
import { useAppDispatch } from "../../../store";
import useChatSelector from "../../../hooks/use-chat-selector";
import {ChatMessageStyled, MessageFailedWrapperStyled} from "../ChatMessageStyled";

const rightAnimation = {
  animate: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: 20 },
  transition: { duration: 0.25, delay: 0.25 },
};

const ClientMessage = (props: {
  message?: Message;
  content?: string;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { failedMessages } = useChatSelector();
  const { t } = useTranslation();

  const content = props.message?.content || props.content;
  const messageRef = useRef<HTMLDivElement>(null);
  const [isTall, setIsTall] = useState(false);

  useEffect(() => {
    if (messageRef.current) {
      const height = messageRef.current.offsetHeight;
      setIsTall(height > 42);
    }
  }, [content, props.message?.file]);

    const messageClass = `client`;
    const contentTallClass = `content  ${isTall ? "clientTallContent" : ""}`;

    if (props.message?.file) {
        return (
            <motion.div
                animate={rightAnimation.animate}
                initial={rightAnimation.initial}
                transition={rightAnimation.transition}
                ref={messageRef}
            >
                <div>
                    <ChatMessageStyled className={messageClass}>
                        <div className="icon">
                            <img src={PersonIcon} alt="Person icon"/>
                        </div>
                        <div className="content file">
                            <img className="fileIcon" src={File} alt="File icon"/>
                            <div className="fileName p-style">{props.message?.file.name}</div>
                            <div className="fileData p-style">{`${props.message?.file.type
                                .split("/")[1]
                                .toUpperCase()}, ${formatBytes(props.message?.file.size)}`}</div>
                        </div>
                    </ChatMessageStyled>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            animate={rightAnimation.animate}
            initial={rightAnimation.initial}
            transition={rightAnimation.transition}
            ref={messageRef}
        >
            <div>
                <ChatMessageStyled className={messageClass}>
                    <div className="client icon">
                        <img src={PersonIcon} alt="Person icon"/>
                    </div>
                    <div className={classNames("content", {clientTallContent: isTall})}>
                        <Markdownify message={content ?? ""} sanitizeLinks/>
                    </div>
                </ChatMessageStyled>
                {!props.message?.id &&
                    failedMessages.some(
                        (msg) => msg.authorTimestamp === props.message?.authorTimestamp
                    ) && (
                        <MessageFailedWrapperStyled>
                            <img
                                src={OutlineError}
                                className="errorIcon"
                                alt="Outline error"
                            />
                            <div>
              <span className="messageFailedText">
                {t("messageSendingFailed")}
              </span>
                                <div className="messageFailedButtons">
                                    <Button
                                        title="send"
                                        className="messageFailedButton"
                                        onClick={() => {
                                            dispatch(removeMessageFromDisplay(props.message!));
                                            const retryMessage = {
                                                ...props.message!,
                                                authorTimestamp: new Date().toISOString(),
                                            };
                                            dispatch(addMessage(retryMessage));
                                            dispatch(sendNewMessage(retryMessage));
                                        }}
                                    >
                                        <strong>{t("sendAgain")}</strong>
                                    </Button>
                                    <Button
                                        title="delete"
                                        className="messageFailedButton"
                                        onClick={() => {
                                            dispatch(removeMessageFromDisplay(props.message!));
                                        }}
                                    >
                                        <strong>{t("delete")}</strong>
                                    </Button>
                                </div>
                            </div>
                        </MessageFailedWrapperStyled>
                    )}
            </div>
        </motion.div>
    );
};

export default ClientMessage;
