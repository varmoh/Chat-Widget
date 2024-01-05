import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PHONE_NR_REGEX, EMAIL_REGEX } from "../constants";

function useMessageValidator() {
  const { t } = useTranslation();
  const [invalidMessage, setInvalidMessage] = useState("");

  const validateInput = (endUserContacts: any) => {
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

  return { validateInput, invalidMessage };
}

export default useMessageValidator;
