import {useTranslation} from 'react-i18next';
import Button from '../button/button';
import {useAppDispatch} from '../../store';
import {setIdleChat} from '../../slices/chat-slice';
import {customJwtExtend} from '../../slices/authentication-slice';
import {IdleChatNotificationStyled} from "./IdleChatNotificationStyled";
import {FC} from "react";

interface IdleChatNotificationProps {
    customMessage?: string;
}


const IdleChatNotification: FC<IdleChatNotificationProps> = ({customMessage}) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    return (
        <IdleChatNotificationStyled>
            <div className="byk_container">
                <dialog
                    className="byk_content"
                    aria-modal="true"
                    aria-labelledby={t("notifications.idle-chat-notification")}
                >
                    <>
                        <div className="byk_title h2-style" role="heading" aria-level={2}>
                            {customMessage || t("notifications.idle-chat-notification")}
                        </div>
                        <div className="byk_actions">
                            <Button
                                title={t("widget.action.yes")}
                                onClick={() => {
                                    dispatch(
                                        setIdleChat({isIdle: false, lastActive: new Date().getTime()})
                                    );
                                    dispatch(customJwtExtend());
                                }}
                            >
                                {t("widget.action.continue")}
                            </Button>
                        </div>
                    </>
                </dialog>
            </div>
        </IdleChatNotificationStyled>
    );
};

export default IdleChatNotification;
