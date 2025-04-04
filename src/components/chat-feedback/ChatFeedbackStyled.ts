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
`