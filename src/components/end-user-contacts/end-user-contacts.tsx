import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import useChatSelector from "../../hooks/use-chat-selector";
import { useAppDispatch } from "../../store";
import { AUTHOR_ROLES, CHAT_EVENTS, StyledButtonType } from "../../constants";
import {
  sendMessageWithNewEvent,
  setShowContactForm,
  setEmailAdress,
  setPhoneNumber,
  updateMessage,
  sendMessagePreview,
} from "../../slices/chat-slice";
import { Message } from "../../model/message-model";
import StyledButton from "../styled-components/styled-button";
import WidgetService from "../../services/widget-service";
import useMessageValidator from "../../hooks/use-message-validator";
import { getContactFormFulfilledNewMessage } from "../../utils/chat-utils";

const EndUserContacts = (): JSX.Element => {
  const { endUserContacts, chatId, contactMsgId } = useChatSelector();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { validateInput, invalidMessage } = useMessageValidator();

  const declineForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMsg: Message = {
      id: contactMsgId,
      chatId,
      content: "",
      preview: "",
      authorRole: AUTHOR_ROLES.END_USER,
      authorTimestamp: new Date().toISOString(),
      event: CHAT_EVENTS.CONTACT_INFORMATION_REJECTED,
    };
    dispatch(updateMessage(newMsg));
    dispatch(sendMessageWithNewEvent(newMsg));
    dispatch(setShowContactForm(false));
    dispatch(sendMessagePreview(newMsg));
  };

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateInput(endUserContacts)) {
      await WidgetService.sendContactInfo(
        chatId ?? "",
        endUserContacts.mailAddress,
        endUserContacts.phoneNr
      ).catch(console.error);

      const newMsg = getContactFormFulfilledNewMessage(
        endUserContacts,
        chatId,
        contactMsgId,
        t
      );
      dispatch(sendMessageWithNewEvent(newMsg));
      dispatch(setShowContactForm(false));
      newMsg.content = "";
      dispatch(sendMessagePreview(newMsg));
      dispatch(setShowContactForm(false));
    }
  };

  return (
    <EndUserContactsStyle>
      <form>
        <div className="container">
          <h3 className="form-header">{t("widget.contacts.contact.header")}</h3>
          {invalidMessage && (
            <p className="missing-feeback">{invalidMessage}</p>
          )}
          <div className="form-body">
            <div className="email-group">
              <h5> {t("widget.contacts.contact.mail.label")}</h5>
              <InputText
                id="email-input"
                className="email-input"
                placeholder={t("widget.contacts.contact.mail.placeholder")}
                value={endUserContacts.mailAddress}
                onChange={(e) => dispatch(setEmailAdress(e.target.value))}
              />
            </div>
            <div className="phone-nr-group">
              <h5>{t("widget.contacts.contact.phone.label")}</h5>
              <InputText
                className="phone-nr-input"
                id="phone-nr-input"
                placeholder={t("widget.contacts.contact.phone.placeholder")}
                value={endUserContacts.phoneNr}
                onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              />
            </div>
          </div>
          <div className="form-footer">
            <StyledButton
              styleType={StyledButtonType.GRAY}
              onClick={(e) => declineForm(e)}
            >
              {t("widget.contacts.contact.close.label")}
            </StyledButton>
            <StyledButton
              styleType={StyledButtonType.GRAY}
              onClick={(e) => submitForm(e)}
            >
              {t("widget.contacts.contact.submit.label")}
            </StyledButton>
          </div>
        </div>
      </form>
    </EndUserContactsStyle>
  );
};

const EndUserContactsStyle = styled.div`
  height: 100%;

  input {
    border: 0;
    border-bottom: 1px solid #003cff;
    padding-bottom: 5px;
    width: 100%;
  }

  h5 {
    margin: 0.5rem 0 0 0;
  }

  .form-header {
    margin-bottom: 1rem;
  }

  .form-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  form {
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -2rem;
  }

  .form-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: medium;

    .email-group {
      padding-bottom: 1rem;
      width: 100%;
    }

    .phone-nr-group {
      width: 100%;
    }

    .email-input:invalid,
    .phone-nr-input:invalid {
      border-color: #ff4800;
    }
  }

  .input-labels {
    display: flex;
    align-items: flex-start;
    justify-items: flex-start;
  }

  .missing-feeback {
    color: #ff4800;
    margin-bottom: -0.5em;
    font-size: 0.75rem;
  }
`;

export default EndUserContacts;
