import styled from "styled-components";
import {colors, fontChat, fontChatBold} from "../../styling/style_settings";

export const ChatStyles = styled.div`
    .chatWrapper {
        z-index: 99;
        position: fixed;
        margin: 1em;
        right: 0;
        bottom: 0;
    }

    @media screen and (max-width: 480px) {
        .chatWrapper {
            display: flex;
            margin: 0.5em;
            top: 0;
            left: 0;
        }
    }

    .chat {
        display: flex;
        flex-direction: column;
        font-family: ${fontChat};
        background: #ffffff;
        box-shadow: 0 4px 4px ${colors.gray};
        height: 100%;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.5;

        b, strong {
            font-family: ${fontChatBold};
        }
    }

    .authenticated {
        box-shadow: 0 0 8px 2px #0078ff;
    }

    @media screen and (max-width: 480px) {
        .chat {
            position: fixed;
            bottom: 0;
            right: 0;
            height: 100dvh;
            width: 100%;
        }
    }
`