import {useTranslation} from 'react-i18next';
import Button from '../button/button';
import {useAppDispatch} from '../../store';
import {endChat, setIdleChat} from '../../slices/chat-slice';
import {CHAT_EVENTS} from '../../constants';
import {customJwtExtend} from '../../slices/authentication-slice';
import {IdleChatNotificationStyled} from "./IdleChatNotificationStyled";
import {FC} from "react";

interface IdleChatNotificationProps {
    displayMessage?: boolean;
    customMessage?: string;
}


const IdleChatNotification: FC<IdleChatNotificationProps> = ({displayMessage = false, customMessage }) => {
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
                    {displayMessage && (
                        <>
                        <div className="byk_title h2-style" role="heading" aria-level={2}>
                            {customMessage || t("conversation.inactive-termination")}
                        </div>
                        <div className="byk_actions">
                            <Button
                                title={t("header.button.close.label")}
                                onClick={() =>
                                    dispatch(
                                        endChat({
                                            event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
                                            isUpperCase: true,
                                        })
                                    )
                                }
                            >
                                {t("header.button.close.label")}
                            </Button>
                        </div>
                        </>
                    )}
                    {!displayMessage && (
                        <>
                            <div className="byk_title h2-style" role="heading" aria-level={2}>
                                {t("notifications.idle-chat-notification")}
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
                        </>
                    )}
                </dialog>
            </div>
        </IdleChatNotificationStyled>
    );
};

export default IdleChatNotification;
