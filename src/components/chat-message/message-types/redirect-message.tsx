import React from 'react';
import {useTranslation} from 'react-i18next';
import {Message} from '../../../model/message-model';
import {CHAT_EVENTS} from '../../../constants';
import {
    generateForwardingRequest,
    removeChatForwardingValue,
    sendMessageWithNewEvent,
    updateMessage
} from '../../../slices/chat-slice';
import {useAppDispatch} from '../../../store';
import {ChatMessageStyled} from "../ChatMessageStyled";
import useChatSelector from "../../../hooks/use-chat-selector";
import {parseNetworkConsent} from "../../../utils/network-consent-utils";
import ChatService from "../../../services/chat-service";

const RedirectMessage = (props: { message: Message }): JSX.Element => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {message} = props;
    const {chatId, messages} = useChatSelector();
    const networkButtons = parseNetworkConsent(message);

    // Bürokrati võrgustik (demo): sama vaade, aga nõusolek käib network/consent kaudu
    if (networkButtons.length > 0) {
        const enabled = messages[messages.length - 1]?.id === message.id || messages[messages.length - 1] === message;
        return (
            <ChatMessageStyled>
                <div style={{color: '#575a5d'}}>{message.content}</div>
                <div className="buttons">
                    {networkButtons.map((b) => (
                        <button key={String(b.accept)} type="button" className="redirect-event-button" disabled={!enabled}
                                onClick={() => { ChatService.networkConsent(chatId ?? '', b.requestId, b.accept).catch(() => undefined); }}>
                            {b.title}
                        </button>
                    ))}
                </div>
            </ChatMessageStyled>
        );
    }

    const redirectResponse = (accepted: boolean) => {
        const responseMessage: Message = {
            ...message,
            event: accepted ? CHAT_EVENTS.REQUESTED_CHAT_FORWARD_ACCEPTED : CHAT_EVENTS.REQUESTED_CHAT_FORWARD_REJECTED,
            authorTimestamp: new Date().toISOString(),
        };
        dispatch(updateMessage(responseMessage));
        dispatch(sendMessageWithNewEvent(responseMessage));

        if (accepted) {
            dispatch(generateForwardingRequest());
        } else {
            dispatch(removeChatForwardingValue());
        }
    };

    return (
        <>
            <ChatMessageStyled>
                <div style={{color: '#575a5d'}}>{t('redirect.ask-permission')}</div>
                <div className="buttons">
                    <button onClick={() => redirectResponse(false)} type="button"
                            className="redirect-event-button">
                        {t('chatMessage.deny')}
                    </button>
                    <button onClick={() => redirectResponse(true)} type="button"
                            className="redirect-event-button">
                        {t('chatMessage.accept')}
                    </button>
                </div>
            </ChatMessageStyled>
        </>
    );
};

export default RedirectMessage;
