import styled from "styled-components";
import {rem} from "../../styling/rem";
import {colors, fontChat, textM} from "../../styling/style_settings";

export const ConfirmationModalStyled = styled.div`
    .container {
        background: rgba(0, 60, 255, 0.8);
        border-radius: 8px;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
    }

    .content {
        background-color: #fff;
        box-shadow: 0 2px 2px rgba(167, 169, 171, 0.2);
        display: flex;
        flex-flow: column nowrap;
        left: 50%;
        min-width: 70%;
        padding: 1.5rem;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 80%;
        height: 80%;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .title {
        font-family: ${fontChat};
        font-style: normal;
        font-weight: 400;
        font-size: ${rem(20)};
        line-height: 30px;
        text-align: center;
        color: ${colors.mustakivi};
        margin: 0;
    }

    .actions {
        align-items: center;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        gap: 10px;

        button {
            width: 100%;
        }
    }

    .npsContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: auto;
    }

    .npsActions {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
    }

    .downloadContainer {
        width: 100%;
        min-height: 93px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .downloadLink {
        font-family: ${fontChat};
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        text-decoration-line: underline;
        color: ${colors.black}
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
    }

    .downloadActions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 5px;
        width: 100%;
    }

    .divider {
        height: 2px;
        background: ${colors.mustakivi}
        width: 100%;
    }

    .forwardForm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        max-width: 320px;
        margin: 0 auto;
        width: 100%;

        .forwardInput {
            width: 100%;
            max-width: 288px;
            margin-right: auto;

            input {
                ${textM};
                border: 0;
                outline: none;
                width: 100%;

                &::placeholder {
                    ${textM};
                }
            }
        }
    }

    .missingFeedback {
        color: #ff4800;
        margin-bottom: -0.5em;
        font-size: 0.75rem;
    }
`

export const ConfirmationModalStyles = styled.div`
    height: auto;
    padding-top: 0.8em;

    flex-direction: column;
    display: flex;

    .feedback-paragraph {
        font-size: 16px;
        text-align: center;
    }

    .feedback-paragraph.above:after {
        content: "*";
        color: #ff4800;
    }

    .feedback-paragraph-secondary {
        font-size: 14px;
        text-align: center;
    }

    .feedback-paragraph-secondary.above:after {
        content: "*";
        color: #ff4800;
    }

    .feedback-btn {
        padding: 0.5rem;
        width: 29px;
        vertical-align: baseline;
        margin: 0;
    }

    .feedback-box-input {
        margin: 1rem 0em 1rem 0em;
    }

    .missing-feeback {
        color: #ff4800;
        margin: 0 0.8em -0.5rem 0.8em;
        font-size: 0.75rem;
    }

    .feedbackInput {
        padding: 7px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 5px;
    }
`;