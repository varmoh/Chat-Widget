import { useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import styles from './online-status-notification.module.scss';

const OnlineStatusNotification = () => {
    const { t } = useTranslation();
  const { burokrattOnlineStatus } = useAppSelector((state) => state.widget);

  if (burokrattOnlineStatus !== true) {
    return <div className={styles.container}>{t('notifications.offline')}</div>;
  } else {
    return null;
  }
};

export default OnlineStatusNotification;
