import styled from "styled-components";
import {colors} from "../../styling/style_settings";

export const ChatKeypadStyled = styled.div `
    .keypad {
        display: flex;
        align-items: center;
        height: 50px;
        bottom: 0 !important;
        padding: 5px;

        &.disabled {
            pointer-events: none;
            user-select: none;

            path {
                stroke: #575a5d;
            }
        }

        .input {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 1em 0.5em 2em 1em;
            flex: 1;
            border: 0;
            outline: none;
            border-bottom: 1px solid ${colors.primary};
            border-radius: 0;
            padding-bottom: 2px;
            resize: none;
            overflow: visible;
            color: inherit;
            font: inherit;
            line-height: 1.5;
            height: auto;
            max-height: 5.6em;

            &::placeholder {
                color: ${colors.placeholderGray};
            }

            &:disabled {
                pointer-events: none;
                user-select: none;
                background-color: transparent;
                border-bottom: 1px solid ${colors.placeholderGray};
            }
        }

        .button {
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            justify-content: center;
            background-color: transparent;
            border: none;
            align-items: center;
            margin: 0;

            &:focus {
                outline: 2px solid ${colors.focusDark};
                border-radius: 1px;
            }
        }
    }

    .button_cancelUpload {
        background: #003cff;
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
`