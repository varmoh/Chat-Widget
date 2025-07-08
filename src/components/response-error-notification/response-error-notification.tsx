import {useTranslation} from "react-i18next";
import Button from "../button/button";
import {useAppDispatch} from "../../store";
import {endChat, resetState, setShowErrorMessage} from "../../slices/chat-slice";
import useChatSelector from "../../hooks/use-chat-selector";
import {CHAT_EVENTS} from "../../constants";
import {ResponseErrorNotificationStyles} from "./ResponseErrorNotificationStyled";

const ResponseErrorNotification = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {chatId, responseErrorMessage} = useChatSelector();

    return (
        <ResponseErrorNotificationStyles>
            <div className="container">
                <dialog className="content" aria-modal="true"
                        aria-labelledby={t("notifications.idle-chat-notification")}>
                    <h2 className="title">
                        {t(responseErrorMessage.length > 0 ? responseErrorMessage : "widget.error.technicalProblems")}
                    </h2>
                    <div className="actions">
                        <Button
                            title={t("widget.action.restartChat")}
                            onClick={() => {
                                if (chatId) {
                                    dispatch(
                                        endChat({
                                            event: CHAT_EVENTS.CLIENT_LEFT_FOR_UNKNOWN_REASONS,
                                            isUpperCase: true,
                                        })
                                    );
                                }
                                dispatch(resetState());
                            }}
                        >
                            {t("widget.action.restartChat")}
                        </Button>
                        <Button title={t("widget.action.continueChat")}
                                onClick={() => dispatch(setShowErrorMessage(false))}>
                            {t("widget.action.continueChat")}
                        </Button>
                    </div>
                </dialog>
            </div>
        </ResponseErrorNotificationStyles>
    );
};

export default ResponseErrorNotification;
