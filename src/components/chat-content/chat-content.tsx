import {AnimatePresence} from 'framer-motion';
import {useEffect, useRef} from 'react';
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react';
import ChatMessage from '../chat-message/chat-message';
import useChatSelector from '../../hooks/use-chat-selector';
import WaitingTimeNotification from '../waiting-time-notification/waiting-time-notification';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './os-custom-theme.scss';
import LoadingMessage from '../chat-message/message-types/loading-message';
import {ChatContentStyles} from "./ChatContentStyled";
import { useScroll } from '../../contexts/ScrollContext';

const ChatContent = (): JSX.Element => {
    const OSref = useRef<OverlayScrollbarsComponent>(null);
    const {messages, failedMessages, showLoadingMessage} = useChatSelector();
    const { setScrollRef, scrollToBottom } = useScroll();

    useEffect(() => {
        setScrollRef(OSref.current);
    }, [setScrollRef]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, failedMessages, scrollToBottom]);

    return (
        <AnimatePresence initial={false}>
            <ChatContentStyles>
                <OverlayScrollbarsComponent
                    className="os-host-flexbox os-custom-theme"
                    ref={OSref}
                    options={{
                        overflowBehavior: {
                            x: 'hidden',
                        },
                        scrollbars: {visibility: 'auto', autoHide: 'leave'},
                    }}
                >
                    {messages.map((message, index) => {
                        if (message.id === "estimatedWaiting" && message.content === "hidden")
                            return <></>;
                        if (message.id === "estimatedWaiting")
                            return <WaitingTimeNotification key={message.authorTimestamp}/>;

                        return (
                            <ChatMessage
                                message={message}
                                key={`${message.authorTimestamp}-${message.created}-${message.id}`}
                                previousMessage={index > 0 ? messages[index - 1] : undefined}
                            />
                        );
                    })}
                    {showLoadingMessage && <LoadingMessage/>}
                </OverlayScrollbarsComponent>
            </ChatContentStyles>
        </AnimatePresence>
    );
};

export default ChatContent;
