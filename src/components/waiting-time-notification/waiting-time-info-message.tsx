import { useTranslation } from 'react-i18next';
import formatTime from '../../utils/format-time';
import NotificationMessage from './notification-message';
import useChatSelector from '../../hooks/use-chat-selector';

const WaitingTimeInfoMessage = () => {
  const { t } = useTranslation();
  const { estimatedWaiting } = useChatSelector();
  
  const FORMATTED_TIME = formatTime(estimatedWaiting.durationInSeconds);
  const timeUnitKey = FORMATTED_TIME > 1 ? 'widget.time.minutes' : 'widget.time.minute';
  const time = `${FORMATTED_TIME} ${t(timeUnitKey)}`;

  return (
    <NotificationMessage showIcon={true}>
      {t('notifications.waiting-time', { time })}
    </NotificationMessage>
  );
}

export default WaitingTimeInfoMessage;
