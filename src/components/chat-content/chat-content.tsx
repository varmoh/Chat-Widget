import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import ChatMessage from '../chat-message/chat-message';
import useChatSelector from '../../hooks/use-chat-selector';
import styles from './chat-content.module.scss';
import WaitingTimeNotification from '../waiting-time-notification/waiting-time-notification';
import useEstimatedWaitingTime from '../../hooks/use-estimated-waiting-time';
import useNameAndTitleVisibility from '../../hooks/use-name-title-visibility';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './os-custom-theme.scss';

const ChatContent = (): JSX.Element => {
  const OSref = useRef<OverlayScrollbarsComponent>(null);
  const { messages } = useChatSelector();

  useEffect(() => {
    if (OSref.current) {
      const instance = OSref.current.osInstance();
      instance?.scroll({ y: '100%' }, 200);
    }
  }, [messages]);

  useEstimatedWaitingTime();
  useNameAndTitleVisibility();

  return (
    <AnimatePresence initial={false}>
      <div className={styles.content}>
        <OverlayScrollbarsComponent
          className="os-host-flexbox os-custom-theme"
          ref={OSref}
          options={{
            overflowBehavior: {
              x: 'hidden',
            },
            scrollbars: { visibility: 'auto', autoHide: 'leave' },
          }}
        >
          {messages.map((message) => 
            message.chatId === 'estimatedWaiting' 
            ? <WaitingTimeNotification />
            : <ChatMessage 
                message={message}
                key={`${message.authorTimestamp}-${message.created}-${message.id}`}
              />
          )}
        </OverlayScrollbarsComponent>
      </div>
    </AnimatePresence>
  );
};

export default ChatContent;
