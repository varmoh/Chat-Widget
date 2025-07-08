import styled from "styled-components";
import {colors} from "../../styling/style_settings";

export const StarsStyles = styled.div`
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;

        & svg {
            cursor: pointer;

            path {
                stroke: scss.$color-hellamaa;
            }

            &:hover {
                &:hover {
                    path {
                        stroke: lightblue; // TODO incorrect missing color
                    }
                }
            }
        }
    }

    .selected {
        path {
            stroke: ${colors.primary} !important;
        }
    }
`