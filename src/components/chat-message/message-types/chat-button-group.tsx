import React, {useMemo} from "react";
import {Message} from "../../../model/message-model";
import {AUTHOR_ROLES, CHAT_MODES} from "../../../constants";
import {useAppDispatch} from "../../../store";
import {addMessage, initChat, queueMessage, sendNewMessage} from "../../../slices/chat-slice";
import useChatSelector from "../../../hooks/use-chat-selector";
import {parseButtons} from "../../../utils/chat-utils";
import {ChatMessageStyled} from "../ChatMessageStyled";
import { isMobileApp } from "../../../utils/browser-utils";
import { isNetworkConsentPayload, sendNetworkConsent } from "../../../utils/network-consent-utils";

const ChatButtonGroup = ({message}: { message: Message }): JSX.Element => {
    const dispatch = useAppDispatch();
    const {chatId, loading, chatMode, messages} = useChatSelector();

    const parsedButtons = useMemo(() => {
        return parseButtons(message);
    }, [message.buttons]);

    const addNewMessageToState = (buttonPayload: string): void => {
        if (isNetworkConsentPayload(buttonPayload)) {
            sendNetworkConsent(chatId, buttonPayload).catch(() => undefined);
            return;
        }
        const message: Message = {
            chatId: chatId ?? "",
            content: buttonPayload,
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

    const isNetworkConsent = parsedButtons?.some(({payload}) => isNetworkConsentPayload(payload)) ?? false;
    const enabled = messages[messages.length - 1] === message && (chatMode === CHAT_MODES.FLOW || isNetworkConsent);

    return (
        <ChatMessageStyled className={isMobileApp() ? "mobile-app" : ""}>
            <div className="buttonsRow">
                {parsedButtons?.map(({title, payload}) => (
                    <button
                        key={payload}
                        type="button"
                        className="action-button"
                        onClick={() => addNewMessageToState(payload)}
                        disabled={!enabled}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </ChatMessageStyled>
    );
};

export default ChatButtonGroup;
