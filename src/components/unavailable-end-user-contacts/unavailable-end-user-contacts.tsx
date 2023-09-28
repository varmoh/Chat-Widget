import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import useChatSelector from "../../hooks/use-chat-selector";
import { useAppDispatch } from "../../store";
import {
  AUTHOR_ROLES,
  CHAT_EVENTS,
  EMAIL_REGEX,
  PHONE_NR_REGEX,
  StyledButtonType,
} from "../../constants";
import {
  sendMessageWithNewEvent,
  sendNewMessage,
  setShowUnavailableContactForm,
  setEmailAdress,
  setPhoneNumber,
  updateMessage,
  sendMessagePreview,
  endChat,
} from "../../slices/chat-slice";
import { Message } from "../../model/message-model";
import StyledButton from "../styled-components/styled-button";
import WidgetService from "../../services/widget-service";

const UnavailableEndUserContacts = (): JSX.Element => {
  const { endUserContacts, chatId, contactMsgId, contactContentMessage } = useChatSelector();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [invalidMessage, setInvalidMessage] = useState("");

  const validateInput = () => {
    if (!endUserContacts.phoneNr && !endUserContacts.mailAddress) {
      setInvalidMessage(t("widget.contacts.contact.invalid.fields"));
      return false;
    }

    if (!new RegExp(PHONE_NR_REGEX).test(endUserContacts.phoneNr)) {
      setInvalidMessage(t("widget.contacts.contact.invalid.phone"));
      return false;
    }

    if (!new RegExp(EMAIL_REGEX).test(endUserContacts.mailAddress)) {
      setInvalidMessage(t("widget.contacts.contact.invalid.email"));
      return false;
    }

    setInvalidMessage("");
    return true;
  };

  const skipForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMsg: Message = {
      id: contactMsgId,
      chatId,
      content: "",
      preview: "",
      authorRole: AUTHOR_ROLES.END_USER,
      authorTimestamp: new Date().toISOString(),
      event: CHAT_EVENTS.CONTACT_INFORMATION_SKIPPED,
    };
    dispatch(updateMessage(newMsg));
    dispatch(sendMessagePreview(newMsg));
    dispatch(
      endChat({
        event: CHAT_EVENTS.CONTACT_INFORMATION_SKIPPED,
        isUpperCase: false,
      })
    );
    dispatch(setShowUnavailableContactForm(false));
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateInput()) {
      let message;
      if (endUserContacts.phoneNr && endUserContacts.mailAddress) {
        message = t("chatMessage.email-and-phone-template", {
          email: endUserContacts.mailAddress,
          phoneNr: endUserContacts.phoneNr,
        });
      } else if (endUserContacts.mailAddress)
        message = t("chatMessage.email-only-template", {
          email: endUserContacts.mailAddress,
        });
      else
        message = t("chatMessage.phone-only-template", {
          phoneNr: endUserContacts.phoneNr,
        });

      WidgetService.sendContactInfo(
        chatId ?? "",
        endUserContacts.mailAddress,
        endUserContacts.phoneNr
      );
      const newMsg: Message = {
        chatId,
        authorRole: AUTHOR_ROLES.END_USER,
        authorTimestamp: new Date().toISOString(),
        content: message,
        event: CHAT_EVENTS.CONTACT_INFORMATION_FULFILLED,
        preview: "",
      };
      dispatch(sendMessageWithNewEvent(newMsg));
      dispatch(setShowUnavailableContactForm(false));
      newMsg.content = "";
      dispatch(sendMessagePreview(newMsg));
      dispatch(
        endChat({
          event: CHAT_EVENTS.UNAVAILABLE_CONTACT_INFORMATION_FULFILLED, isUpperCase: false
        })
      );
      dispatch(setShowUnavailableContactForm(false));
    }
  };

  return (
    <UnavailableEndUserContactsStyle>
      <form>
        <div className="container">
          <h3 className="form-header">{contactContentMessage}</h3>
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
                pattern={EMAIL_REGEX}
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
                pattern={PHONE_NR_REGEX}
                value={endUserContacts.phoneNr}
                onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              />
            </div>
          </div>
          <div className="form-footer">
            <StyledButton
              styleType={StyledButtonType.GRAY}
              onClick={(e) => skipForm(e)}
            >
              {t("widget.contacts.contact.skip.label")}
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
    </UnavailableEndUserContactsStyle>
  );
};

const UnavailableEndUserContactsStyle = styled.div`
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
    text-align: center;
  }

  .form-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  form {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -3rem;
    margin-left: 1rem;
    margin-right: 1rem;
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

export default UnavailableEndUserContacts;
