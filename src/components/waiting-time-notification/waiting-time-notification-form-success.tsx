import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {WaitingTimeNotificationStyles} from "./WaitingTimeNotificationStyled";

interface Props {
    formData: {
        phone: string;
        email: string;
        message: string;
    };
}

const WaitingTImeNotificationFormSuccess: FC<Props> = ({
                                                           formData: {phone, email, message},
                                                       }) => {
    const {t} = useTranslation();
    return (
        <WaitingTimeNotificationStyles>
            <div className="form">
                <table>
                    <thead>
                    <tr>
                        <th>{t('widget.form.info')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>{message}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </WaitingTimeNotificationStyles>
    );
};

export default WaitingTImeNotificationFormSuccess;
