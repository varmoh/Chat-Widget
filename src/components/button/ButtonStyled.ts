import styled from "styled-components";
import {rem} from "../../styling/rem";
import {colors} from "../../styling/style_settings";

export const ButtonStyles = styled.div`
    .button {
        padding: 12px 18px;
        gap: ${rem(8)};
        height: ${rem(40)};
        border-radius: 100px;
        border: none;
        outline: none;
        cursor: pointer;
        text-transform: uppercase;
        font-size: ${rem(12)};
        font-weight: 700;
        letter-spacing: 0.5px;
        line-height: 16px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    .blue {
        color: ${colors.white};
        background: ${colors.primary};
    }

    .gray {
        color: scss.$color-white;
        background: scss.$color-hellamaa;
    }
`