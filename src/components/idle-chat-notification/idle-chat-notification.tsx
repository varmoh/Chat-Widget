import {useTranslation} from 'react-i18next';
import Button from '../button/button';
import styles from './idle-chat-notification.module.scss';
import {useAppDispatch} from '../../store';
import {endChat, setIdleChat} from '../../slices/chat-slice';
import {CHAT_EVENTS} from '../../constants';
import {customJwtExtend} from '../../slices/authentication-slice';

const IdleChatNotification = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <div className="byk-chat">
            <div className={styles.container}>
                <dialog
                    className={styles.content}
                    aria-modal="true"
                    aria-labelledby={t("notifications.idle-chat-notification")}
                >
                    <h2 className={styles.title}>
                        {t("notifications.idle-chat-notification")}
                    </h2>
                    <div className={styles.actions}>
                        <Button
                            title={t("widget.action.yes")}
                            onClick={() => {
                                dispatch(
                                    setIdleChat({isIdle: false, lastActive: new Date().getTime()})
                                );
                                dispatch(customJwtExtend());
                            }}
                        >
                            {t("widget.action.yes")}
                        </Button>
                        <Button
                            title={t("widget.action.no")}
                            onClick={() =>
                                dispatch(
                                    endChat({
                                        event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
                                        isUpperCase: true,
                                    })
                                )
                            }
                        >
                            {t("widget.action.no")}
                        </Button>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default IdleChatNotification;
