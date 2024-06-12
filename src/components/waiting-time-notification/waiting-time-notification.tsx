import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './waiting-time-notification.module.scss';
import Button, { ButtonColor } from '../button/button';
import WaitingTimeNotificationForm from './waiting-time-notification-form';
import NotificationMessage from './notification-message';
import WaitingTimeInfoMessage from './waiting-time-info-message';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../chat-content/os-custom-theme.scss';

const WaitingTimeNotification: React.FC = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.container}>
      <WaitingTimeInfoMessage />
      <NotificationMessage showIcon={false}>
        {t('notifications.ask-contact-information')}
      </NotificationMessage>
      <div className={styles.action}>
        <Button
          title={t('widget.action.yes')}
          color={ButtonColor.BLUE}
          onClick={() => setShowForm(true)}
        >
          {t('widget.action.yes')}
        </Button>
        <Button
          title={t('widget.action.no')}
          color={showForm === false ? ButtonColor.BLUE : ButtonColor.GRAY}
          onClick={() => setShowForm(false)}
        >
          {t('widget.action.no')}
        </Button>
      </div>
      {showForm && <WaitingTimeNotificationForm />}
    </div>
  );
};

export default WaitingTimeNotification;
