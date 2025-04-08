import React from "react";
import {useTranslation} from "react-i18next";
import useChatSelector from "../../../hooks/use-chat-selector";
import useAuthenticationSelector from "../../../hooks/use-authentication-selector";
import {redirectToTim} from "../../../utils/auth-utils";
import {ChatMessageStyled} from "../ChatMessageStyled";

const AuthenticationMessage = (): JSX.Element => {
    const {t} = useTranslation();
    const {chatId, isChatEnded} = useChatSelector();
    const {isAuthenticated} = useAuthenticationSelector();

    return (
        <>
            <ChatMessageStyled>
                <div className="authenticationbox-explanation-text">
                    {t("notifications.authenticate")}
                </div>
                <button
                    disabled={isChatEnded || isAuthenticated}
                    onClick={redirectToTim}
                    className={`event-button ${
                        isAuthenticated ? "authenticated" : ""
                    }`}
                >
                    {chatId && isAuthenticated ? (
                        <span>{t("notifications.authenticate.is-authenticated")}</span>
                    ) : (
                        <span>{t("notifications.authenticate.needs-authentication")}</span>
                    )}
                </button>
            </ChatMessageStyled>
        </>
    );
};

export default AuthenticationMessage;
