import styled from "styled-components";
import {colors, fontChat, fontChatBold} from "../../styling/style_settings";

export const ChatStyles = styled.div<{isFullScreen?: boolean}>`
    .chatWrapper {
        z-index: 99;
        position: fixed !important;
        margin: ${props => props.isFullScreen ? '0' : '1em'};
        right: 0;
        bottom: 0;
        top: ${props => props.isFullScreen ? '0' : 'auto'};
        left: ${props => props.isFullScreen ? '0' : 'auto'};
        width: ${props => props.isFullScreen ? '100vw' : 'auto'};
        height: ${props => props.isFullScreen ? '100vh' : 'auto'};
    }

    .chat-resize-handle {
        position: absolute !important;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: nwse-resize;
        z-index: 100;
    }

    .chat-resize-handle-top-left {
        top: 11px;
        left: 10px;
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
        height: ${props => props.isFullScreen ? '100vh' : '100%'};
        width: ${props => props.isFullScreen ? '100vw' : '100%'};
        border-radius: ${props => props.isFullScreen ? '0' : '8px'};
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
