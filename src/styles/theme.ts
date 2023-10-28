import { DefaultTheme } from "styled-components";

// 폰트
const fonts = {
    family: {
        base: `'Noto Sans KR', sans-serif`,
        title: `'Noto Sans KR', sans-serif`,
    },
    size: {
        // 디자인 결정되면 그때 변경할 것. 그전에는 base만 사용
        sm: "0.5rem",
        base: "1rem",
        // lg: "2rem",
        // xl: "2.5rem",
        // title: "6rem",
    },
};
export type FontSizeTypes = typeof fonts;

// 색상
const colors = {
    primary: "#953D93",
    secondary: "#EA884C",
    warning: "#FF383C",
    grey: "#b3b3b3",
    black: "#222222",
    bg: "#F5F5F5",
    dark_bg: "#1e1e1e", // cover bg 로 사용
    grey_bg: "#404040", // script bg, wave bg 로 사용
    lightPrimary: "#f0daee",
    lightGrey: "#dbdbdb",
    hover: "#f7f7f7",
    light_bg: "#faf8fa",
    minute_bg: "#efefef",
};
export type ColorTypes = typeof colors;

// 반응형
const size = {
    only_mobile: "32rem",
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
    desktopLarge: "1200px",
};
const devices = {
    mobile: `@media only screen and (min-width: ${size.mobile})`,
    tablet: `@media only screen and (min-width: ${size.tablet})`,
    desktop: `@media only screen and (min-width: ${size.desktop})`,
    desktopLarge: `@media only screen and (min-width: ${size.desktopLarge})`,
    max_only_mobile: `@media only screen and (max-width: ${size.only_mobile})`,
    max_mobile: `@media only screen and (max-width: ${size.mobile})`,
    max_tablet: `@media only screen and (max-width: ${size.tablet})`,
    max_desktop: `@media only screen and (max-width: ${size.desktop})`,
    max_desktopLarge: `@media only screen and (max-width: ${size.desktopLarge})`,
};
export type DevicesTypes = typeof devices;

const zIndex = {
    background_img: -1,
    modalBG: 100,
    modal: 101,
};
export type ZIndexTypes = typeof zIndex;

const theme: DefaultTheme = {
    colors,
    fonts,
    devices,
    zIndex,
};
export default theme;
