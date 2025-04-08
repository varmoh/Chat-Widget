import {context} from "./style_settings";

export const rem = (pixels: number): string => {
    return `${pixels / context}rem`;
};