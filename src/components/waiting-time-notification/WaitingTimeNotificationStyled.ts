import styled from "styled-components";
import {colors, textM, textS, textSBold} from "../../styling/style_settings";

export const WaitingTimeNotificationStyles = styled.div`
    .container {
        display: flex;
        flex-flow: column;
        gap: 10px;
        margin-right: 10px;
    }

    .form {
        grid-area: form;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 308px;
        height: fit-content;
        padding: 10px;
        justify-self: flex-end;
        margin: 0;
        margin-left: auto;

        background: ${colors.gray};
        border-radius: 4px;

        input[type='phone'],
        input[type='email'] {
            ${textM};
            width: 100%;
            outline: 0;
            border: 0;
            background: transparent;
            border-bottom: 2px solid ${colors.majakivi};

            &::placeholder {
                ${textM};
            }
        }

        textarea {
            ${textM};
            width: 100%;
            outline: 0;
            border: 0;
            background: transparent;
            resize: vertical;
            overflow: auto;
            height: 86px;
            border-bottom: 2px solid ${colors.majakivi};

            &::placeholder {
                ${textM};
            }
        }

        button {
            margin-left: auto;
        }

        table {
            width: 100%;

            & * {
                text-align: left;
            }

            thead {
                & * {
                    ${textSBold};
                }
            }

            tbody {
                & * {
                    ${textS};
                }
            }
        }
    }

    .messageContainer {
        ${textS};
        background: ${colors.white};
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        gap: 5px;
        margin-left: 20px;

        p {
            margin: 0;
            border-radius: 8px 8px 8px 4px;
            border: 1px solid ${colors.hellamaa};
            padding: 4px 8px;
            max-width: 303px;
        }
    }

    .infoIcon {
        width: 32px;
        height: 32px;
        background: ${colors.white};
        border: 1px solid ${colors.hellamaa};
        border-radius: 40px;
        position: relative;

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .hideIcon {
        visibility: hidden;
    }

    .action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 5px;
    }
`