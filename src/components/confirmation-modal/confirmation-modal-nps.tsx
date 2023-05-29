import { useState } from 'react';
import Button, { ButtonColor } from '../button/button';
import { useAppDispatch } from '../../store';
import { endChat, sendChatNpmRating } from '../../slices/chat-slice';
import styles from './confirmation-modal.module.scss';
import { useTranslation } from 'react-i18next';
import Stars from '../stars/stars';

interface Props {
  npsFeedback: any;
}

const ConfirmationModalNps = ({ npsFeedback }: Props) => {
  const { t } = useTranslation();
  const [stars, setStars] = useState<number>(0);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.npsContainer}>
      <h2 className={styles.title}>{t('widget.action.nps-confirmation')}</h2>
      <Stars onClick={(e) => setStars(e)} />
      <div className={styles.npsActions}>
        <Button
          onClick={() => dispatch(endChat())}
          title={t('widget.action.skip')}
          color={ButtonColor.GRAY}
        >
          {t('widget.action.skip')}
        </Button>
        <Button
          onClick={() => {
            dispatch(sendChatNpmRating({ NpmRating: stars }));
            dispatch(endChat())}}
          title={t('widget.action.confirm')}
          color={ButtonColor.BLUE}
        >
          {t('widget.action.confirm')}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModalNps;
