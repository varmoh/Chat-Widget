import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import StyledButton from "../styled-components/styled-button";
import {useAppDispatch} from "../../store";
import {downloadChat, sendChatNpmRating, setFeedbackRatingGiven} from "../../slices/chat-slice";
import {StyledButtonType} from "../../constants";
import useChatSelector from "../../hooks/use-chat-selector";
import {Download, DownloadElement} from "../../hooks/use-download-file";
import styles from "./chat-feedback.module.scss";
import {ChatFeedbackStyle} from "../../styling/StyledElements";

const ChatFeedback = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {feedback} = useChatSelector();
    const [selectedFeedbackButtonValue, setSelectedFeedbackButtonValue] = useState<string>("");
    const downloadRef = useRef<DownloadElement>(null);

    const handleFeedback = (feedbackRating: string | null) => {
        if (feedbackRating === null) return;
        setSelectedFeedbackButtonValue(feedbackRating);
        dispatch(sendChatNpmRating({NpmRating: parseInt(feedbackRating ?? "1", 10)}));
        dispatch(setFeedbackRatingGiven(true));
    };

    const handleDownload = async () => {
        const response = await dispatch(downloadChat(false));
        if (response.meta.requestStatus === "rejected") {
            return false;
        }
        downloadRef.current?.download({title: `chat-history.pdf`, data: (response.payload as any).data});
        return true;
    };

    return (
        <div className="byk-chat">
            <ChatFeedbackStyle>
                <p className="feedback-paragraph above">
                    {t("feedback.upperText", {
                        organization: window._env_.ORGANIZATION_NAME,
                    })}
                </p>
                {feedback.showFeedbackWarning && <p className="missing-feeback">{t("feedback.warningText")}</p>}
                <div className="feedback-box-input" style={{alignSelf: "center"}}>
                    {Array.from(Array(11).keys()).map((val: number) => (
                        <StyledButton
                            className="feedback-btn"
                            onClick={(e) => handleFeedback(e.currentTarget.textContent)}
                            styleType={StyledButtonType.GRAY}
                            key={val}
                            active={selectedFeedbackButtonValue === val.toString()}
                        >
                            <span>{val}</span>
                        </StyledButton>
                    ))}
                </div>
                <div className={styles.downloadContainer}>
                    <Download ref={downloadRef}/>
                    <a onClick={handleDownload} className={styles.downloadLink}>
                        {t("widget.action.download-chat")}
                    </a>
                </div>
                <p className="feedback-paragraph below">{t("feedback.lowerText")}</p>
            </ChatFeedbackStyle>
        </div>
    );
};

export default ChatFeedback;
