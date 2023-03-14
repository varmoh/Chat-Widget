import { useRef, useState } from 'react';
import Button from '../button';
import { ButtonColor } from '../button/button';
import { closeConfirmationModal } from '../../slices/widget-slice';
import { useAppDispatch } from '../../store';
import styles from './confirmation-modal.module.scss';
import { useTranslation } from 'react-i18next';
import { Download, DownloadElement } from '../../hooks/use-download-file';
import { downloadChat } from '../../slices/chat-slice';


const ConfirmationModalDownload = () => {
  const { t } = useTranslation();
  const [showForwardForm, setShowForwardForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const downloadRef = useRef<DownloadElement>(null);
  const handleDownload = async () => {
    // const response = await dispatch(downloadChat()) // TODO replace with real download chat action
    const url = 'https://cors-anywhere.herokuapp.com/https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        },
    };
    fetch(url, requestOptions)
    .then((res) => res.blob())
    .then((data) => {
      downloadRef.current?.download({ title: `dummy.pdf`, data});
    });
  }

  return (
    <div className={styles.downloadContainer}>
      {!showForwardForm ? (
        <>
        <Download ref={downloadRef} />
        <a onClick={handleDownload} className={styles.downloadLink}>{t('widget.action.download-chat')}</a>
          <a
            onClick={() => setShowForwardForm(true)}
            className={styles.downloadLink}
          >
            {t('widget.action.forward-chat')}
          </a>
        </>
      ) : (
        <>
          <form className={styles.forwardForm}>
            <div className={styles.forwardInput}>
              <input
                type="email"
                placeholder={t('widget.action.forward-email')}
              />
              <hr className={styles.divider} />
            </div>
            <div className={styles.downloadActions}>
              <Button
                onClick={() => setShowForwardForm(false)}
                title={t('widget.action.skip')}
                color={ButtonColor.GRAY}
              >
                {t('widget.action.skip')}
              </Button>
              <Button
                onClick={() => dispatch(closeConfirmationModal())}
                title={t('widget.action.confirm')}
                color={ButtonColor.BLUE}
              >
                {t('widget.action.confirm')}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ConfirmationModalDownload;
