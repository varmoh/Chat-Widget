import {FC} from 'react';
import InfoIcon from './info-icon';
import {WaitingTimeNotificationStyles} from "./WaitingTimeNotificationStyled";

interface Props {
    showIcon: boolean;
    children: any;
}

const NotificationMessage: FC<Props> = ({showIcon, children}) => {
    return (
        <WaitingTimeNotificationStyles>
            <div className="messageContainer">
                <div
                    className={
                        showIcon === true
                            ? `infoIcon`
                            : `infoIcon hideIcon`
                    }
                >
                    <InfoIcon/>
                </div>
                <div className="message">
                    <p>{children}</p>
                </div>
            </div>
        </WaitingTimeNotificationStyles>
    );
};

export default NotificationMessage;
