import React, {useState} from 'react';
import Button, {ButtonColor} from '../button/button';
import Stars from "../stars";
import {useAppDispatch} from "../../store";
import {endChat} from "../../slices/chat-slice";
import styles from "./confirmation-modal.module.scss";
import useChatSelector from "../../hooks/use-chat-selector";
import {useTranslation} from "react-i18next";

interface Props {
    npsFeedback: any;
}

const ConfirmationModalNps = ({npsFeedback}: Props) => {
    const {t} = useTranslation();
    const [stars, setStars] = useState<number>(0);
    const dispatch = useAppDispatch();
    const {chatId} = useChatSelector();


    return (
        <div className={styles.npsContainer}>
            <h2 id="confirmation_modal_title" className={styles.title}>
                {t('widget.action.nps-confirmation')}
            </h2>
            <Stars onClick={e => setStars(e)}/>
            <div className={styles.npsActions}>
                <Button onClick={() => dispatch(endChat())} title="123" color={ButtonColor.GRAY}>{t('widget.action.skip')}</Button>
                <Button onClick={() => dispatch(endChat())} title="123" color={ButtonColor.BLUE}>{t('widget.action.confirm')}</Button>
            </div>
        </div>
    )
}

export default ConfirmationModalNps