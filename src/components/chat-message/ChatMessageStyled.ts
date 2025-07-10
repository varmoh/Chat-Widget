import styled from "styled-components";
import {colors, fontChat} from "../../styling/style_settings";

const LinkIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 0 100 100' aria-hidden='true' role='img'%3E%3Cg fill='white'%3E%3Cpath d='M69.37 54.11v25.83a2.61 2.61 0 01-2.6 2.6H20a2.61 2.61 0 01-2.6-2.6v-46.8a2.61 2.61 0 012.6-2.6h31.49V24H14.12a3.26 3.26 0 00-3.25 3.25v58.5A3.26 3.26 0 0014.12 89h58.5a3.26 3.26 0 003.25-3.25V54.11z'/%3E%3Cpath d='M50.75 54.85l30.62-30.62V51a3.91 3.91 0 003.9 3.89A3.86 3.86 0 0089.13 51V14.88A3.86 3.86 0 0085.27 11H49.13a3.87 3.87 0 100 7.73h26.76L45.26 49.37a3.88 3.88 0 105.49 5.48z'/%3E%3C/g%3E%3C/svg%3E")`;

export const MessageFailedWrapperStyled = styled.div`
    display: flex;
    gap: 2px;
    justify-content: end;
    margin-right: 13px;

    .errorIcon {
        height: 22px;
        width: 22px;
    }

    .messageFailedText {
        color: red;
        display: flex;
        font-size: 11px;
        margin-top: 4px;
    }

    .messageFailedButtons {
        display: flex;
        gap: 20px;
        justify-content: center;

        .messageFailedButton {
            background: none;
            border: none;
            color: red;
            cursor: pointer;
            font-size: 11px;
            padding: 0;

            &:hover,
            &:active {
                text-decoration: underline;
            }
        }
    }
`

export const ChatMessageStyled = styled.div`
    margin: 0.4em;
    margin-bottom: 0;

    &:last-of-type {
        margin-bottom: 0.4em;
    }

    border: 1px solid transparent;
    color: white;
    align-items: flex-start;

    .content {
        padding: 0.6em 1.2em;
        word-break: break-word;
        white-space: pre-wrap;

        a {
            background: ${LinkIcon} no-repeat right center;
            padding-right: 1.25em;
            color: white;
        }
    }

    .icon {
        display: flex;
        width: 2.8em;
        height: 2.8em;
        flex-shrink: 0;
    }

    .edited-message {
      color: #9799a4;
      font-size: 11px;
      line-height: 20px;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 0.1rem 3.1rem;
    }

    .event-button {
        cursor: pointer;
        font-family: ${fontChat};
        font-size: 1em;
        margin: 0.7rem 0.3rem 0.3rem 0.3rem;
        padding: 0.3rem 1.5rem;
        background-color: ${colors.primary};
        color: white;
        border: none;
        box-shadow: 2px 1px 4px grey;

        &:hover {
            filter: brightness(0.95);
        }

        &.authenticated {
            color: gray;
            background-color: lightgray;
            cursor: default;
        }
    }

    .action-button {
        cursor: pointer;
        font-family: ${fontChat};
        font-size: 1em;
        margin: 0.7rem 0.3rem 0.3rem 0.3rem;
        padding: 0.3rem 1.5rem;
        background-color: ${colors.primary};
        color: white;
        border: none;
        border-radius: 4px;
        box-shadow: 2px 1px 4px grey;

        &:hover {
            filter: brightness(0.95);
        }

        &:active:not(:disabled) {
            filter: brightness(0.75);
            box-shadow: none;
        }

        &:disabled {
            opacity: 0.5;
            box-shadow: none;
            cursor: default;
        }
    }

    .action-option {
        background-color: ${colors.secondary};
    }

    .buttonsRow {
        margin-left: 2.8em;
    }

    .decline-event-button,
    .redirect-event-button {
        cursor: pointer;
        font-family: ${fontChat};
        font-size: 1em;
        margin: 0.7rem 0.3rem 0.3rem 0.3rem;
        padding: 0.3rem 1.5rem;
        background-color: #f0f1f2;
        color: #003cff;
        border: none;
        box-shadow: 2px 1px 4px grey;

        &:hover {
            filter: brightness(0.95);
        }
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .row {
        margin-bottom: 6px;
    }

    .feedback {
        display: flex;
        margin-left: 0.4rem;
        align-self: center;

        .highlight {
            filter: grayscale(0);
        }

        .grey {
            filter: grayscale(0.7);
        }

        button {
            background: transparent;
            border: transparent;
            cursor: pointer;
            padding: 0;
            margin: 3px;
            height: 20px;
            width: 20px;

            .thumbsDownImg {
                transform: rotate(180deg);
            }
        }

        button:hover {
            filter: grayscale(0);
        }
    }

    &.event {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${colors.gray};
        text-align: center;
        color: #575a5d;
        border-radius: 6px;
        margin-right: 0.8em;
        margin-left: 0.8em;
    }
    
    &.admin {
        margin-right: 4em;
        margin-left: 0.8em;
        display: flex;
        flex-direction: column;

        .name {
            color: ${colors.black};
            font-size: 0.95em;
            padding-left: 3.4em;
        }

        .main {
            display: flex;
            align-items: flex-start;

            .content {
                border-radius: 6px 48px 48px 29px;
                background-color: ${colors.primary};
            }

            .emergency_content {
                border-radius: 6px 48px 48px 29px;
                border: 1px solid ${colors.inputBorderGray};
                color: ${colors.black};
                background-color: ${colors.white};
            }

            .icon {
                padding-right: 0.5em;

                .emergency {
                    height: 100%;
                    width: 100%;
                    background-color: #003cff;
                    border-radius: 50%;
                    text-align: center;
                    font-size: 32px;
                    margin: 0;
                }
            }
        }
    }

    &.client {
        margin-left: 4em;
        margin-right: 0.8em;
        display: flex;
        flex-direction: row-reverse;

        .content {
            border-radius: 48px 6px 29px 48px;
            background-color: ${colors.secondary};
        }

        .file {
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas:
                "fileIcon fileName"
                "fileIcon fileData";
            gap: 0;

            .fileIcon {
                grid-area: fileIcon;
                grid-row: span 2;
                padding-right: 0.5em;
                height: 24px;
                align-self: center;
                margin: 5px 10px;
                filter: brightness(0) invert(1);
            }

            .fileName {
                grid-area: fileName;
                font-weight: 700;
                font-size: 14px;
                text-decoration: underline;
                margin: 0;
            }

            .fileData {
                grid-area: fileData;
                font-weight: 400;
                font-size: 10px;
                line-height: 24px;
                margin: 0;
            }
        }

        .icon {
            padding-left: 0.5em;
        }

        a {
            color: white;
            background: ${LinkIcon} no-repeat right center;
            padding-right: 18px;
        }
    }

    &.client.tall {
        .content {
            border-radius: 27px 6px 27px 27px !important;
        }
    }
    
    .clientTallContent {
        border-radius: 27px 6px 27px 27px !important;
        
    }

    &.admin.tall {
        .content {
            border-radius: 6px 27px 27px 27px !important;
        }
    }
    
    .adminTallContent {
        border-radius: 6px 27px 27px 27px !important;
    }
`
