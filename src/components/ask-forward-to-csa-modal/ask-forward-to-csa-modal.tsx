import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useChatSelector from "../../hooks/use-chat-selector";
import { useAppDispatch } from "../../store";
import { StyledButtonType } from "../../constants";
import StyledButton from "../styled-components/styled-button";
import styles from "./ask-forward-to-csa-modal.module.scss";

const AskForwardToCsaModal = (): JSX.Element => {
  const { forwardToCsaMessage } = useChatSelector();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <form className={styles.form_body}>
      <div className={styles.container}>
        <h3 className={styles.form_header}>{forwardToCsaMessage}</h3>
        <div className={styles.form_footer}>
          <StyledButton styleType={StyledButtonType.GRAY} onClick={() => {}}>
            {t("widget.contacts.contact.skip.label")}
          </StyledButton>
          <StyledButton styleType={StyledButtonType.GRAY} onClick={() => {}}>
            {t("widget.contacts.contact.submit.label")}
          </StyledButton>
        </div>
      </div>
    </form>
  );
};

export default AskForwardToCsaModal;
