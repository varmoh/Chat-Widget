import {useState} from 'react';
import Button from "../button";
import {ButtonColor} from "../button/button";
import {closeConfirmationModal} from "../../slices/widget-slice";
import {useAppDispatch} from "../../store";
import styles from "./confirmation-modal.module.scss";
import {useTranslation} from "react-i18next";

const ConfirmationModalDownload = () => {
    const {t} = useTranslation();
    const [showForwardForm, setShowForwardForm] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.downloadContainer}>
            {!showForwardForm ?
                <>
                    <a href="#" className={styles.downloadLink}>{t('widget.action.download-chat')}</a>
                    <a onClick={() => setShowForwardForm(true)}
                       className={styles.downloadLink}>{t('widget.action.forward-chat')}</a>
                </> :
                <>
                    <form className={styles.forwardForm}>
                        <div className={styles.forwardInput}>
                            <input type="email" placeholder={t('widget.action.forward-email')}/>
                            <hr className={styles.divider}/>
                        </div>
                        <div className={styles.downloadActions}>
                            <Button onClick={() => setShowForwardForm(false)} title={t('widget.action.skip')}
                                    color={ButtonColor.GRAY}>{t('widget.action.skip')}</Button>
                            <Button onClick={() => dispatch(closeConfirmationModal())}
                                    title={t('widget.action.confirm')}
                                    color={ButtonColor.BLUE}>{t('widget.action.confirm')}</Button>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}

export default ConfirmationModalDownload