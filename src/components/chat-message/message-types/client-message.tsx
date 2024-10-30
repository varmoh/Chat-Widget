import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { Message } from "../../../model/message-model";
import styles from "../chat-message.module.scss";
import PersonIcon from "../../../static/icons/person.svg";
import Markdownify from "./Markdownify";
import formatBytes from "../../../utils/format-bytes";
import File from "../../../static/icons/file.svg";

const rightAnimation = {
  animate: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: 20 },
  transition: { duration: 0.25, delay: 0.25 },
};

const ClientMessage = (props: { message?: Message, content?: string }): JSX.Element => {
  const content = props.message?.content || props.content;

  if (props.message?.file) {
    return (
      <motion.div
        animate={rightAnimation.animate}
        initial={rightAnimation.initial}
        transition={rightAnimation.transition}
      >
        <div className={classNames(styles.message, styles.client)}>
          <div className={styles.icon}>
            <img src={PersonIcon} alt="Person icon" />
          </div>
          <div className={`${styles.content} ${styles.file}`}>
            <img className={styles.fileIcon} src={File} alt="File icon" />
            <p className={styles.fileName}>{props.message?.file.name}</p>
            <p className={styles.fileData}>{`${props.message?.file.type
              .split("/")[1]
              .toUpperCase()}, ${formatBytes(props.message?.file.size)}`}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={rightAnimation.animate}
      initial={rightAnimation.initial}
      transition={rightAnimation.transition}
    >
      <div className={classNames(styles.message, styles.client)}>
        <div className={styles.icon}>
          <img src={PersonIcon} alt="Person icon" />
        </div>
        <div className={styles.content}>
          <Markdownify message={content ?? ""} />
        </div>
      </div>
    </motion.div>
  );
};

export default ClientMessage;
