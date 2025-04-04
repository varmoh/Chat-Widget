import {useState} from "react";
import Button, {ButtonColor} from "../button/button";
import {useAppDispatch} from "../../store";
import {endChat, sendChatNpmRating, sendFeedbackMessage, setFeedbackRatingGiven} from "../../slices/chat-slice";
import {useTranslation} from "react-i18next";
import {CHAT_EVENTS, StyledButtonType} from "../../constants";
import StyledButton from "../styled-components/styled-button";
import {ConfirmationModalStyled, ConfirmationModalStyles} from "./ConfirmationModalStyled";

interface Props {
    readonly npsFeedback: {
        readonly feedback: CHAT_EVENTS | null;
        readonly showNps: boolean;
    };
}

const ConfirmationModalNps = ({npsFeedback}: Props) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const endChatParams = {
        event: npsFeedback.feedback,
        isUpperCase: true,
    };
    const [selectedFeedbackButtonValue, setSelectedFeedbackButtonValue] = useState<string>("");

    const [feedbackText, setFeedbackText] = useState<string>("");

    const handleFeedback = (feedbackRating: string | null) => {
        console.log(feedbackRating);
        if (feedbackRating === null) return;
        setSelectedFeedbackButtonValue(feedbackRating);
        dispatch(
            sendChatNpmRating({
                NpmRating: parseInt(feedbackRating ?? "", 10),
            })
        );
        dispatch(setFeedbackRatingGiven(true));
    };
    return (
        <ConfirmationModalStyled>
            <div className="npsContainer">
                <ConfirmationModalStyles>
                    <p className="feedback-paragraph above">
                        {t("feedback.upperText", {
                            organization: window._env_.ORGANIZATION_NAME,
                        })}
                    </p>
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
                    <p className="feedback-paragraph-secondary below">{t("feedback.lowerText")}</p>
                    <input
                        className="feedbackInput"
                        aria-label={t("keypad.input.label")}
                        placeholder={t("keypad.input.feedbackPlaceholder")}
                        onChange={(e) => {
                            setFeedbackText(e.target.value);
                        }}
                    />
                </ConfirmationModalStyles>
                <div className="npsActions">
                    <Button
                        onClick={() => {
                            if (feedbackText !== "") {
                                dispatch(sendFeedbackMessage({userInput: feedbackText}));
                            }
                            dispatch(endChat(endChatParams));
                        }}
                        title={t("widget.action.skip")}
                        color={ButtonColor.GRAY}
                    >
                        {t("widget.action.skip")}
                    </Button>
                    <Button
                        onClick={() => {
                            if (feedbackText !== "") {
                                dispatch(sendFeedbackMessage({userInput: feedbackText}));
                            }
                            dispatch(endChat(endChatParams));
                        }}
                        title={t("widget.action.confirm")}
                        color={ButtonColor.BLUE}
                    >
                        {t("widget.action.confirm")}
                    </Button>
                </div>
            </div>
        </ConfirmationModalStyled>
    );
};


export default ConfirmationModalNps;
