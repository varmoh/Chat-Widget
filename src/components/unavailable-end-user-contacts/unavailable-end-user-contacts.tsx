import React from "react";
import {useTranslation} from "react-i18next";
import {InputText} from "primereact/inputtext";
import useChatSelector from "../../hooks/use-chat-selector";
import {useAppDispatch} from "../../store";
import {AUTHOR_ROLES, CHAT_EVENTS, StyledButtonType} from "../../constants";
import {
    endChat,
    sendMessagePreview,
    sendMessageWithNewEvent,
    sendNewSilentMessage,
    setContactFormComment,
    setEmailAdress,
    setPhoneNumber,
    setShowUnavailableContactForm,
    updateMessage,
} from "../../slices/chat-slice";
import {Message} from "../../model/message-model";
import StyledButton from "../styled-components/styled-button";
import WidgetService from "../../services/widget-service";
import useMessageValidator from "../../hooks/use-message-validator";
import {getContactCommentNewMessage, getContactFormFulfilledNewMessage} from "../../utils/chat-utils";
import Markdownify from "../chat-message/message-types/Markdownify";
import {TextAreaStyle, UnavailableEndUserContactsStyle} from "./UnavailableEndUserContactsStyled";

const UnavailableEndUserContacts = (): JSX.Element => {
    const {endUserContacts, chatId, contactMsgId, contactContentMessage, askForContacts} = useChatSelector();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {validateInput, invalidMessage} = useMessageValidator();

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

    const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validateInput(endUserContacts)) {
            await WidgetService.sendContactInfo(chatId ?? "", endUserContacts.mailAddress, endUserContacts.phoneNr).catch(
                console.error
            );

            const newMsg = getContactFormFulfilledNewMessage(endUserContacts, chatId, contactMsgId, t);
            dispatch(sendMessageWithNewEvent(newMsg));
            dispatch(setShowUnavailableContactForm(false));
            newMsg.content = "";
            dispatch(sendMessagePreview(newMsg));

            if (endUserContacts.comment) {
                const commentMsg = getContactCommentNewMessage(endUserContacts.comment, chatId, contactMsgId, t);
                dispatch(sendNewSilentMessage(commentMsg));
            }

            dispatch(
                endChat({
                    event: CHAT_EVENTS.UNAVAILABLE_CONTACT_INFORMATION_FULFILLED,
                    isUpperCase: false,
                })
            );
            dispatch(setShowUnavailableContactForm(false));
        }
    };

    return (
        <UnavailableEndUserContactsStyle>
            <form>
                <div className="container">
                    <h3 className="form-header"><Markdownify message={contactContentMessage}></Markdownify></h3>
                    {invalidMessage && <p className="missing-feeback">{invalidMessage}</p>}
                    {askForContacts && (
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
                            <div className="comment-group">
                                <h5>{t("widget.contacts.contact.comment.label")}</h5>
                                <TextAreaStyle
                                    rows={3}
                                    id="comment-input"
                                    className="comment-input"
                                    name="comment"
                                    placeholder={t("widget.contacts.contact.comment.placeholder")}
                                    value={endUserContacts.comment}
                                    onChange={(e) => dispatch(setContactFormComment(e.target.value))}
                                />
                            </div>
                        </div>
                    )}
                    {askForContacts && (
                        <div className="form-footer">
                            <StyledButton styleType={StyledButtonType.GRAY} onClick={skipForm}>
                                {t("widget.contacts.contact.skip.label")}
                            </StyledButton>
                            <StyledButton styleType={StyledButtonType.GRAY} onClick={submitForm}>
                                {t("widget.contacts.contact.submit.label")}
                            </StyledButton>
                        </div>
                    )}
                    {!askForContacts && (
                        <div className="form-footer">
                            <StyledButton styleType={StyledButtonType.GRAY} onClick={skipForm}>
                                {t("header.button.close.label")}
                            </StyledButton>
                        </div>
                    )}
                </div>
            </form>
        </UnavailableEndUserContactsStyle>
    );
};

export default UnavailableEndUserContacts;
