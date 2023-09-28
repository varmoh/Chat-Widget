import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { endChat, setIsChatOpen } from "../../slices/chat-slice";
import Buerokratt from "../../static/icons/buerokratt.svg";
import { useAppDispatch } from "../../store";
import { getFromSessionStorage } from "../../utils/session-storage-utils";
import styles from "./profile.module.scss";
import useWidgetSelector from "../../hooks/use-widget-selector";
import useChatSelector from "../../hooks/use-chat-selector";
import { CHAT_EVENTS } from "../../constants";

export const Profile = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { widgetConfig } = useWidgetSelector();
  const [delayFinished, setDelayFinished] = useState(false);
  const newMessagesAmount = getFromSessionStorage("newMessagesAmount");
  const { isChatEnded, messages, isChatOpen, chatId } = useChatSelector();

  const openChat = () => {
    dispatch(setIsChatOpen(true));
  };

  const variants = {
    initial: {
      y: 100,
    },
    animate: {
      y: 0,
    },
  };

  useEffect(() => {
    setTimeout(
      () => setDelayFinished(true),
      widgetConfig.bubbleMessageSeconds * 1000
    );
  }, []);

  const getActiveProfileClass = () => {
    if (delayFinished && widgetConfig.animation === "jump")
      return styles.profile__jump;
    if (delayFinished && widgetConfig.animation === "wiggle")
      return styles.profile__wiggle;
    if (delayFinished && widgetConfig.animation === "shockwave")
      return styles.profile__shockwave;
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (chatId) {
        dispatch(
          endChat({
            event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
            isUpperCase: true,
          })
        );
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F5" || (event.ctrlKey && event.key === "r")) {
        if (chatId) {
          dispatch(
            endChat({
              event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
              isUpperCase: true,
            })
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

  return (
    <div className={styles.profile__wrapper}>
      <motion.div
        className={`${styles.profile} ${getActiveProfileClass()}`}
        variants={variants}
        initial="initial"
        animate="animate"
        style={{
          animationIterationCount: widgetConfig.proactiveSeconds,
          backgroundColor: widgetConfig.color,
        }}
        role="button"
        aria-label={t("profile.button.open-chat")}
        title={t("profile.button.open-chat")}
        onKeyDown={openChat}
        onClick={openChat}
        tabIndex={0}
      >
        <img
          src={Buerokratt}
          alt="Buerokratt logo"
          width={45}
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>
      {widgetConfig.showMessage && (
        <div
          className={`${styles.profile__greeting_message} ${
            delayFinished && styles.profile__greeting_message__active
          }`}
        >
          {widgetConfig.bubbleMessageText}
        </div>
      )}
      {newMessagesAmount !== null && parseInt(newMessagesAmount, 10) > 0 ? (
        <span className={styles.bubble}>{newMessagesAmount}</span>
      ) : null}
    </div>
  );
};

export default Profile;
