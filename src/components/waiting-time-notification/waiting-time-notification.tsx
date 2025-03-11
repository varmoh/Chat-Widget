import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import styles from './waiting-time-notification.module.scss';
import Button, {ButtonColor} from '../button/button';
import WaitingTimeNotificationForm from './waiting-time-notification-form';
import NotificationMessage from './notification-message';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import '../chat-content/os-custom-theme.scss';
import {useDispatch} from 'react-redux';
import {removeEstimatedWaitingMessage} from '../../slices/chat-slice';

const WaitingTimeNotification: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="byk-chat">
            <div className={styles.container}>
                <NotificationMessage showIcon={false}>
                    {t('notifications.ask-contact-information')}
                </NotificationMessage>
                <div className={styles.action}>
                    <Button
                        title={t('widget.action.yes')}
                        color={showForm ? ButtonColor.GRAY : ButtonColor.BLUE}
                        onClick={() => setShowForm(true)}
                    >
                        {t('widget.action.yes')}
                    </Button>
                    <Button
                        title={t('widget.action.no')}
                        color={ButtonColor.BLUE}
                        onClick={() => dispatch(removeEstimatedWaitingMessage())}
                    >
                        {t('widget.action.no')}
                    </Button>
                </div>
                {showForm && <WaitingTimeNotificationForm/>}
            </div>
        </div>
    );
};

export default WaitingTimeNotification;
