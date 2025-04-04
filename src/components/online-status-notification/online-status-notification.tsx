import {useAppSelector} from "../../store";
import {useTranslation} from "react-i18next";
import {OnlineStatusNotificationStyles} from "./OnlineStatusNotificationStyles";

const OnlineStatusNotification = () => {
    const {t} = useTranslation();
    const {burokrattOnlineStatus} = useAppSelector((state) => state.widget);

    if (burokrattOnlineStatus !== true) {
        return <OnlineStatusNotificationStyles>{t("notifications.offline")}</OnlineStatusNotificationStyles>;
    } else {
        return null;
    }
};

export default OnlineStatusNotification;
