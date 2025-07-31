import React, {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import StyledButton from "../styled-components/styled-button";
import {useAppDispatch} from "../../store";
import {downloadChat, sendChatNpmRating, setFeedbackRatingGiven} from "../../slices/chat-slice";
import {isFeedbackRatingColorsEnabled, StyledButtonType} from "../../constants";
import useChatSelector from "../../hooks/use-chat-selector";
import {Download, DownloadElement} from "../../hooks/use-download-file";
import {ChatFeedbackStyled} from "./ChatFeedbackStyled";
import useWidgetSelector from "../../hooks/use-widget-selector";

const ChatFeedback = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {feedback} = useChatSelector();
    const { widgetConfig } = useWidgetSelector();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedFeedbackButtonValue, setSelectedFeedbackButtonValue] = useState<string>("");
    const downloadRef = useRef<DownloadElement>(null);

    const handleFeedback = (feedbackRating: string | null) => {
        if (!widgetConfig.feedbackActive) {
          dispatch(setFeedbackRatingGiven(true));
          return;
        };
        if (feedbackRating === null) return;
        setSelectedFeedbackButtonValue(feedbackRating);
        dispatch(sendChatNpmRating({NpmRating: parseInt(feedbackRating ?? "1", 10)}));
        dispatch(setFeedbackRatingGiven(true));
    };

    const handleDownload = async () => {
        setLoading(true)
        try {
            const response = await dispatch(downloadChat(false));
            if (response.meta.requestStatus === "rejected") {
                return false;
            }
            downloadRef.current?.download({title: `chat-history.pdf`, data: (response.payload as any).data});
            return true;
        } finally {
            setLoading(false);
        }
    };

    return (
      <ChatFeedbackStyled>
        {widgetConfig.feedbackActive && <p className="feedback-paragraph above">{widgetConfig.feedbackQuestion}</p>}
        {widgetConfig.feedbackActive && feedback.showFeedbackWarning && (
          <p className="missing-feeback">{t("feedback.warningText")}</p>
        )}
        {widgetConfig.feedbackActive && (
          <div className="feedback-box-input" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from(Array(11).keys()).map((val: number) => {
              const isMediumCheck = val <= 8 ? "yellow" : "green";
              const color = val <= 6 ? "red" : isMediumCheck;
              return (
                <StyledButton
                  className={`feedback-btn ${isFeedbackRatingColorsEnabled ? color : ""} ${val == 10 ? "last" : ""}`}
                  onClick={(e) => handleFeedback(e.currentTarget.textContent)}
                  styleType={StyledButtonType.GRAY}
                  key={val}
                  active={selectedFeedbackButtonValue === val.toString()}
                >
                  <span>{val}</span>
                </StyledButton>
              );
            })}
          </div>
        )}
        <div className="downloadContainer">
          <Download ref={downloadRef} />
          <a onClick={handleDownload} className="downloadLink">
            {loading ? <span className="spinner"></span> : t("widget.action.download-chat")}
          </a>
        </div>
        {widgetConfig.feedbackNoticeActive && <p className="feedback-paragraph below">{widgetConfig.feedbackNotice}</p>}
      </ChatFeedbackStyled>
    );
};

export default ChatFeedback;
