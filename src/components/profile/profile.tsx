import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {setIsChatOpen} from "../../slices/chat-slice";
import Buerokratt from "../../static/icons/buerokratt.svg";
import {useAppDispatch} from "../../store";
import useWidgetSelector from "../../hooks/use-widget-selector";
import useReloadChatEndEffect from "../../hooks/use-reload-chat-end-effect";
import {getFromLocalStorage} from "../../utils/local-storage-utils";
import {ProfileStyles} from "./ProfileStyles";

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
        if (delayFinished && widgetConfig.animation === "jump") return "profile__jump";
        if (delayFinished && widgetConfig.animation === "wiggle") return "profile__wiggle";
        if (delayFinished && widgetConfig.animation === "shockwave") return "profile__shockwave";
    };

    return (
        <ProfileStyles>
            <ProfileStyles className="profile__wrapper">
                <ProfileStyles>
                <motion.button
                    className={`profile ${getActiveProfileClass()}`}
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
                    <img src={Buerokratt} alt="Buerokratt logo" width={45} className="logo" loading="eager"/>
                </motion.button>
                </ProfileStyles>
                {widgetConfig.showMessage && (
                    <div
                        className={`profile profile__greeting_message ${delayFinished && "profile__greeting_message__active"}`}
                    >
                        {widgetConfig.bubbleMessageText}
                    </div>
                )}
                {newMessagesAmount !== null && parseInt(newMessagesAmount, 10) > 0 ? (
                    <span className="bubble">{newMessagesAmount}</span>
                ) : null}
            </ProfileStyles>
        </ProfileStyles>
    );
};

export default Profile;
