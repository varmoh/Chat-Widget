import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {setIsChatOpen} from "../../slices/chat-slice";
import Buerokratt from "../../static/icons/buerokratt.svg";
import {useAppDispatch} from "../../store";
import styles from "./profile.module.scss";
import useWidgetSelector from "../../hooks/use-widget-selector";
import useReloadChatEndEffect from "../../hooks/use-reload-chat-end-effect";
import {getFromLocalStorage} from "../../utils/local-storage-utils";

export const Profile = (): JSX.Element => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {widgetConfig} = useWidgetSelector();
    const [delayFinished, setDelayFinished] = useState(false);
    const newMessagesAmount = getFromLocalStorage("newMessagesAmount");

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
        setTimeout(() => setDelayFinished(true), widgetConfig.bubbleMessageSeconds * 1000);
    }, []);

    useReloadChatEndEffect();

    const getActiveProfileClass = () => {
        if (delayFinished && widgetConfig.animation === "jump") return styles.profile__jump;
        if (delayFinished && widgetConfig.animation === "wiggle") return styles.profile__wiggle;
        if (delayFinished && widgetConfig.animation === "shockwave") return styles.profile__shockwave;
    };

    return (
        <div className="byk-chat">
            <div className={styles.profile__wrapper}>
                <motion.button
                    className={`${styles.profile} ${getActiveProfileClass()}`}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    style={{
                        animationIterationCount: widgetConfig.proactiveSeconds,
                        backgroundColor: widgetConfig.color,
                    }}
                    aria-label={t("profile.button.open-chat")}
                    title={t("profile.button.open-chat")}
                    onKeyDown={openChat}
                    onClick={openChat}
                    tabIndex={0}
                >
                    <img src={Buerokratt} alt="Buerokratt logo" width={45} className={styles.logo} loading="eager"/>
                </motion.button>
                {widgetConfig.showMessage && (
                    <div
                        className={`${styles.profile__greeting_message} ${delayFinished && styles.profile__greeting_message__active}`}
                    >
                        {widgetConfig.bubbleMessageText}
                    </div>
                )}
                {newMessagesAmount !== null && parseInt(newMessagesAmount, 10) > 0 ? (
                    <span className={styles.bubble}>{newMessagesAmount}</span>
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
