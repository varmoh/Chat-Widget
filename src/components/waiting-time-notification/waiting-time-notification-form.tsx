import Button, { ButtonColor } from '../button/button';
import { useState } from 'react';
import WaitingTImeNotificationFormSuccess from './waiting-time-notification-form-success';
import NotificationMessage from './notification-message';
import { useTranslation } from 'react-i18next';
import { sendMessageWithNewEvent, sendNewSilentMessage } from '../../slices/chat-slice';
import { useAppDispatch } from '../../store';
import { getContactCommentNewMessage, getContactFormFulfilledNewMessage } from '../../utils/chat-utils';
import useChatSelector from '../../hooks/use-chat-selector';
import styles from './waiting-time-notification.module.scss';

const WaitingTimeNotificationForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { chatId } = useChatSelector();
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    message: '',
    sent: false,
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const info = {phoneNr: formData.phone, mailAddress: formData.email, idCode: '', comment: formData.message};
    const newMsg = getContactFormFulfilledNewMessage(info, chatId, '', t);
    dispatch(sendMessageWithNewEvent(newMsg));
    if(formData.message) {
      const commentMsg = getContactCommentNewMessage(formData.message, chatId, '', t);
      dispatch(sendNewSilentMessage(commentMsg));
    }

    setFormData({ ...formData, sent: true });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  if(formData.sent) {
    return (
      <>
        <WaitingTImeNotificationFormSuccess formData={formData} />
        <NotificationMessage showIcon>
          {t('widget.form.success')}
        </NotificationMessage>
      </>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <input
        type="phone"
        placeholder={t('widget.form.phone')}
        name="phone"
        value={formData.phone}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="email"
        name="email"
        placeholder={t('widget.form.email')}
        value={formData.email}
        onChange={(e) => handleChange(e)}
      />
      <textarea
        rows={4}
        name="message"
        placeholder={t('widget.form.message')}
        value={formData.message}
        onChange={(e) => handleChange(e)}
      />
      <Button
        onClick={() => true}
        title="title"
        color={ButtonColor.BLUE}
        type="submit"
      >
        {t('chat.feedback.button.label')}
      </Button>
    </form>
  );
};

export default WaitingTimeNotificationForm;
