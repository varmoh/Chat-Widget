import styled from "styled-components";
import {rem} from "../../styling/rem";
import {colors} from "../../styling/style_settings";

export const IdleChatNotificationStyled = styled.div`
    .byk_container {
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

    .byk_content {
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

    .byk_title {
        font-family: 'Aino Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: ${rem(20)};
        line-height: 30px;
        text-align: center;
        color: ${colors.mustakivi};
        margin: 0;
    }

    .byk_actions {
        align-items: center;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        gap: 10px;

        button {
            width: 100%;
        }
    }
`