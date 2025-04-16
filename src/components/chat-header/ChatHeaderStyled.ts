import styled from "styled-components";
import {colors, fontTitle} from "../../styling/style_settings";

export const ChatHeaderStyles = styled.div `
    display: flex;
    background: ${colors.primary};
    border-radius: 8px 8px 0 0;
    padding: 0.5em;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    width: calc(100% + 2px);
    transform: translate(-1px);
    border-bottom: 1px solid ${colors.headerBottomBorder};
    user-select: none;

    button {
        background: transparent;
        border: transparent;
        cursor: pointer;
        padding: 0;
        height: 32px;
        width: 32px;
        margin-left: 0.5em;

        &:focus {
            outline: 2px solid ${colors.focusLight};
            border-radius: 1px;
        }
    }

    .hidden {
        opacity: 0;
    }
`

export const ChatHeaderInitialStyles = styled.div`
    .hamburger-icon {
        background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iSGFtYnVyZ2VyX2ljb24iIGRhdGEtbmFtZT0iSGFtYnVyZ2VyIGljb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8ZyBpZD0iSGFtYnVyZ2VyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcuNSAtMjU0LjUpIj4KICAgIDxsaW5lIGlkPSJMaW5lIiB4MT0iMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjUgMjY0LjUpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8bGluZSBpZD0iTGluZS0yIiBkYXRhLW5hbWU9IkxpbmUiIHgxPSIxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuNSAyNzAuNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIGlkPSJMaW5lLTMiIGRhdGEtbmFtZT0iTGluZSIgeDE9IjE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC41IDI3Ni41KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDwvZz4KICA8cmVjdCBpZD0iQm9yZGVyIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg==);
        background-repeat: no-repeat;
        width: 32px;
        height: 32px;
        transition: 250ms background-image;

        &.active {
            background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iSGFtYnVyZ2VyX2ljb24iIGRhdGEtbmFtZT0iSGFtYnVyZ2VyIGljb24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8ZyBpZD0iSGFtYnVyZ2VyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcuNSAtMjU0LjUpIj4KICAgIDxsaW5lIGlkPSJMaW5lIiB4MT0iMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjUgMjY0LjUpIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDNjZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8bGluZSBpZD0iTGluZS0yIiBkYXRhLW5hbWU9IkxpbmUiIHgxPSIxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuNSAyNzAuNSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwM2NmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIGlkPSJMaW5lLTMiIGRhdGEtbmFtZT0iTGluZSIgeDE9IjE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC41IDI3Ni41KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAzY2ZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDwvZz4KICA8cmVjdCBpZD0iQm9yZGVyIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg==);
            background-color: white;
            border-radius: 8px;
        }
    }

    .title {
        flex-direction: row;
        display: flex;
        margin-right: 1rem;
        justify-content: center;
        font-family: ${fontTitle};
        color: ${colors.white};
        font-size: 26px;
        width: 100%;
        text-align: center;
    }

    .actions {
        display: flex;
        position: absolute;
        right: 0.5em;
    }

    .shield {
        display: flex;
        margin-right: 1rem;
        opacity: 1;
    }
`;
