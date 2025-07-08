import React from 'react';
import {WarningStyle} from "./WarninNotificationStyled";

interface WarningNotificationProps {
    warningMessage: string;
}

const WarningNotification = (props: WarningNotificationProps): JSX.Element => {
    const {warningMessage = ''} = props;
    return (
        <WarningStyle>
            <div className="byk_warning">{warningMessage}</div>
        </WarningStyle>
    );
};


export default WarningNotification;