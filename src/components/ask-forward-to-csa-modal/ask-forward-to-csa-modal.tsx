import React from "react";
import {useTranslation} from "react-i18next";
import useChatSelector from "../../hooks/use-chat-selector";
import {useAppDispatch} from "../../store";
import {AUTHOR_ROLES, CHAT_EVENTS, StyledButtonType} from "../../constants";
import StyledButton from "../styled-components/styled-button";
import {redirectToBackoffice, sendMessageWithNewEvent, setShowAskToForwardToCsaForm} from "../../slices/chat-slice";
import {Message} from "../../model/message-model";
import {AskForwardToCsaModalStyles} from "./AskForwardToCsaStyled";

const AskForwardToCsaModal = (): JSX.Element => {
    const {forwardToCsaMessage, chatId, forwardToCsaMessageId} = useChatSelector();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    return (
        <AskForwardToCsaModalStyles>
            <div className="container">
                <h3 className="header">{forwardToCsaMessage}</h3>
                <div className="buttons">
                    <StyledButton styleType={StyledButtonType.GRAY} onClick={() => {
                        dispatch(setShowAskToForwardToCsaForm(false));
                        if (chatId) {
                            const newMsg: Message = {
                                id: forwardToCsaMessageId,
                                chatId,
                                content: "",
                                preview: "",
                                authorRole: AUTHOR_ROLES.BACKOFFICE_USER,
                                authorTimestamp: new Date().toISOString(),
                                event: CHAT_EVENTS.FORWARDED_TO_BACKOFFICE,
                            };
                            dispatch(redirectToBackoffice(newMsg));
                        }
                    }}>
                        {t("widget.action.yes")}
                    </StyledButton>
                    <StyledButton styleType={StyledButtonType.GRAY} onClick={() => {
                        const newMsg: Message = {
                            id: forwardToCsaMessageId,
                            chatId,
                            content: "",
                            preview: "",
                            authorRole: AUTHOR_ROLES.END_USER,
                            authorTimestamp: new Date().toISOString(),
                            event: CHAT_EVENTS.CONTINUE_CHATTING_WITH_BOT,
                        };
                        dispatch(sendMessageWithNewEvent(newMsg));
                        dispatch(setShowAskToForwardToCsaForm(false));
                    }}>
                        {t("widget.action.no")}
                    </StyledButton>
                </div>
            </div>
        </AskForwardToCsaModalStyles>
    );
};

export default AskForwardToCsaModal;
