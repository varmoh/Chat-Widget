import { useTranslation } from "react-i18next";
import Button from "../button/button";
import styles from "./response-error-notification.module.scss";
import { useAppDispatch } from "../../store";
import { setShowErrorMessage, resetState } from "../../slices/chat-slice";
import useChatSelector from "../../hooks/use-chat-selector";

const ResponseErrorNotification = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { responseErrorMessage } = useChatSelector();

  console.log("responseErrorMessage", responseErrorMessage);
  return (
    <div className={styles.container}>
      <dialog className={styles.content} aria-modal="true" aria-labelledby={t("notifications.idle-chat-notification")}>
        <h2 className={styles.title}>
          {t(responseErrorMessage.length > 0 ? responseErrorMessage : "widget.error.technicalProblems")}
        </h2>
        <div className={styles.actions}>
          <Button
            title={t("widget.action.restartChat")}
            onClick={() => {
              dispatch(resetState());
            }}
          >
            {t("widget.action.restartChat")}
          </Button>
          <Button title={t("widget.action.continueChat")} onClick={() => dispatch(setShowErrorMessage(false))}>
            {t("widget.action.continueChat")}
          </Button>
        </div>
      </dialog>
    </div>
  );
};

export default ResponseErrorNotification;
