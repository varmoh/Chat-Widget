import styled, {css} from "styled-components";
import {colors, fontChat} from "../../styling/style_settings";

const elements = {
    afterBg: css`
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 50%;
    `,
};

export const ProfileStyles = styled.div `
    .profile__wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
    }

    .profile__shockwave {
        animation: shockwaveJump 1s ease-out infinite;
    }

    .profile__shockwave:after {
        ${elements.afterBg};
        animation: shockwave 1s 0.65s ease-out;
        animation-iteration-count: inherit;
    }

    .profile__jump {
        animation: 0.4s jump ease infinite alternate;
    }

    .profile__wiggle {
        animation: 1s wiggle ease infinite;
    }

    .profile__greeting_message {
        white-space: nowrap;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem 0.5rem 0.25rem 0.5rem;
        background-color: ${colors.white};
        position: absolute;
        font-size: 1rem;
        font-family: 'ADAM', sans-serif;
        line-height: 1.5;
        top: 50%;
        right: calc(100% - 6px);
        opacity: 0;
        transform: translateY(100%);
        transition: all 250ms;
    }

    .profile__greeting_message__active {
        opacity: 1;
        transform: translateY(-50%);
    }

    .profile {
        display: flex;
        align-items: center;
        padding: 1rem 1rem;
        width: 77px;
        height: 77px;
        cursor: pointer;
        background-color: ${colors.primary};
        border-radius: 50%;
        border: 2px solid ${colors.primary};
        margin: 1rem 1rem;
        box-sizing: border-box;

        .profile__wrapper {
            position: fixed;
            bottom: 0;
            right: 0;
        }
    }

    .bubble {
        padding: 0.1rem 0.4rem 0.1rem 0.4rem;
        position: relative;
        top: -18px;
        left: -18px;
        background-color: ${colors.primary};
        color: #ffffff;
        font-family: ${fontChat};
        border-radius: 50%;
    }

    @keyframes shockwaveJump {
        0% {
            transform: scale(1);
        }
        40% {
            transform: scale(1.08);
        }
        50% {
            transform: scale(0.98);
        }
        55% {
            transform: scale(1.02);
        }
        60% {
            transform: scale(0.98);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes shockwave {
        0% {
            transform: scale(1);
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(0, 0, 0, 0.15);
        }
        95% {
            box-shadow: 0 0 50px rgba(0, 0, 0, 0), inset 0 0 30px rgba(0, 0, 0, 0);
        }
        100% {
            transform: scale(2.25);
        }
    }

    @keyframes jump {
        0% {
            transform: scale(1);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }
        100% {
            transform: scale(1.05);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
    }

    @keyframes wiggle {
        0% {
            transform: rotate(-3deg);
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        }
        20% {
            transform: rotate(20deg);
        }
        40% {
            transform: rotate(-15deg);
        }
        60% {
            transform: rotate(5deg);
        }
        90% {
            transform: rotate(-1deg);
        }
        100% {
            transform: rotate(0);
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
        }
    }

    .logo {
        filter: brightness(0) invert(1);
        image-rendering: auto;
    }
`