import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import ChatMessage from '../chat-message/chat-message';
import useChatSelector from '../../hooks/use-chat-selector';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import './os-custom-theme.scss';
import styles from './chat-content.module.scss';
import WaitingTimeNotification from '../waiting-time-notification/waiting-time-notification';
import { useAppDispatch } from '../../store';
import { getEstimatedWaitingTime, setEstimatedWaitingTimeToZero } from '../../slices/chat-slice';

const ChatContent = (): JSX.Element => {
  const OSref = useRef<OverlayScrollbarsComponent>(null);
  const { messages, estimatedWaiting, customerSupportId } = useChatSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (OSref.current) {
      const instance = OSref.current.osInstance();
      instance?.scroll({ y: '100%' }, 200);
    }
  }, [messages]);

  useEffect(() => {
    if (customerSupportId !== '') dispatch(setEstimatedWaitingTimeToZero());
    else if (estimatedWaiting.durationInSeconds === '') dispatch(getEstimatedWaitingTime());
  }, [estimatedWaiting.durationInSeconds, dispatch, customerSupportId]);


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
          {/* TODO: Logic is incorrect, commented out until it gets fixed */}
          {/* {~~estimatedWaiting.durationInSeconds > 0 &&
            ~~estimatedWaiting.positionInUnassignedChats > 0 &&
             <WaitingTimeNotification />} */}
          {messages.map((message) => <ChatMessage 
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
