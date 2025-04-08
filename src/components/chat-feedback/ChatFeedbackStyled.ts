import styled from "styled-components";
import {colors, fontChat} from "../../styling/style_settings";

export const ChatFeedbackStyled = styled.div`
    .downloadContainer {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.2em;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .downloadLink {
        font-family: ${fontChat};
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        text-decoration-line: underline;
        color: ${colors.black};
        cursor: pointer;
    }

    .feedback-btn {
        padding: 0.5rem;
        width: 32px;
        vertical-align: baseline;
        margin: 0;
        border-radius: 5px;
        color: white;
        margin-left: 2px;
        margin-bottom: 2px;

        &.red {
            background-color: #f25050;
        }

        &.yellow {
            background-color: #f1d15a;
        }

        &.green {
            background-color: #46ba45;
        }

        :hover,
        :focus {
            background-color: #003cff !important;
        }
    }

    .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid transparent;
        border-top-color: blue;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
        display: inline-block;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .feedback-box-input {
        justify-content: space-around;
        display: flex;
        flex-flow: row nowrap;
        margin: 1rem 0.8em 2rem 0.8em;
    }
`