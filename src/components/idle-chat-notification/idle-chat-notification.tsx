import { useTranslation } from 'react-i18next';
import Button from '../button/button';
import styles from './idle-chat-notification.module.scss';
import { useAppDispatch } from '../../store';
import { closeConfirmationModal } from '../../slices/widget-slice';
import { endChat, setIdleChat } from '../../slices/chat-slice';
import { CHAT_EVENTS } from '../../constants';
// TODO: Add customJwtExtend
// import { customJwtExtend } from '../../slices/authentication-slice';

const IdleChatNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={t('notifications.idle-chat-notification')}
      >
        <h2 className={styles.title}>
          {t('notifications.idle-chat-notification')}
        </h2>
        <div className={styles.actions}>
          <Button
            title={t('widget.action.yes')}
            onClick={() => {
              dispatch(setIdleChat({isIdle: false, lastActive: new Date().getTime()}));
              // TODO: Add customJwtExtend
              // dispatch(customJwtExtend())
            }}
          >
            {t('widget.action.yes')}
          </Button>
          <Button
            title={t('widget.action.no')}
            onClick={() => dispatch(endChat({event:CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS}))}
          >
            {t('widget.action.no')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdleChatNotification;
