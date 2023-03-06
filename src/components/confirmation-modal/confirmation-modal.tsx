import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {closeConfirmationModal} from '../../slices/widget-slice';
import {RootState, useAppDispatch} from '../../store';
import Button from "../button";
import styles from './confirmation-modal.module.scss';
import ConfirmationModalNps from "./confirmation-modal-nps";
import ConfirmationModalDownload from "./confirmation-modal-download";
import {ChatFeedback} from "../../model/chat-feedback";

export default function ConfirmationModal(): JSX.Element {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const isConfirmationModelOpen = useSelector((state: RootState) => state.widget.showConfirmationModal);
    const [nps, setNps] = useState<any>({
        showNps: false,
        feedback: null,
    });

    if (!isConfirmationModelOpen) return <></>;

    function handleClick(option: ChatFeedback) {
        if (option === ChatFeedback.SAIN_VASTUSE) {
            setNps({
                ...nps,
                showNps: true,
                feedback: option,
            });
        } else if (option === ChatFeedback.VASTUSETA) {
            setNps({
                ...nps,
                showNps: true,
                feedback: option,
            });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content} role="dialog" aria-modal="true" aria-labelledby="confirmation_modal_title">
                {nps.showNps === false ?
                    <>
                        <h2 id="confirmation_modal_title" className={styles.title}>
                            {t('widget.action.close-confirmation')}
                        </h2>
                        <div className={styles.actions}>
                            <Button title={t('header.button.confirmation.yes')}
                                    onClick={() => handleClick(ChatFeedback.SAIN_VASTUSE)}>
                                {t('widget.action.yes-got-answer')}
                            </Button>
                            <Button title={t('header.button.confirmation.yes')}
                                    onClick={() => handleClick(ChatFeedback.VASTUSETA)}>
                                {t('widget.action.yes-no-answer')}
                            </Button>
                            <Button title={t('header.button.confirmation.no')}
                                    onClick={() => dispatch(closeConfirmationModal())}>
                                {t('widget.action.no-dont-close')}
                            </Button>
                        </div>
                    </> :
                    <>
                        <ConfirmationModalNps npsFeedback={nps}/>
                        <ConfirmationModalDownload/>
                    </>

                }
            </div>
        </div>
    );
}
