import {css} from 'styled-components';

export const colors = {
    primary: '#003cff',
    secondary: '#3c0078',
    black: '#000',
    mustakivi: '#323334',
    gray: '#a7a9ab33',
    hellamaa: '#cfd1d2',
    majakivi: '#575a5d',
    placeholderGray: '#a7a9ab',
    inputBorderGray: '#83878b',
    backgroundGray: '#f0f1f2',
    white: '#ffffff',
    focusLight: '#ffffff5e',
    focusDark: '#003cff26',
    scrollbarNormal: 'rgba(0, 0, 0, 0.2)',
    scrollbarHover: 'rgba(0, 0, 0, 0.3)',
    scrollbarActive: 'rgba(0, 0, 0, 0.5)',
    headerBottomBorder: '#ffffff30',
};

export const fontTitle = `'Aino Headline', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
export const fontChat = `'Aino Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;
export const fontChatBold = `'Aino Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`;


export const textM = css`
    font-family: ${fontTitle};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.mustakivi};
`;

export const textMBold = css`
    ${textM};
    font-family: ${fontChatBold};
    font-weight: 700;
`

export const textS = css`
    font-family: ${fontChat};
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${colors.mustakivi};
`;


export const textSBold = css`
    ${textS};
    font-family: ${fontChatBold};
    font-weight: 700;
`;

export const textXS = css`
    font-family: ${fontChat};
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: ${colors.mustakivi};

`;

export const textXSBold = css`
    ${textXS};
    font-family: ${fontChatBold};
    font-weight: 700;
`;

export const buttonS = css`
    ${textXS};
    text-transform: uppercase;
`;

export const context = 16;