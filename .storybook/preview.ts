import type { Preview, StoryContext } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";

import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme";
import { GlobalStyle } from "../src/styles/GlobalStyle";
import { RecoilProvider } from "./provider";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  RecoilProvider,
  withThemeFromJSXProvider({
    themes: { theme },
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyle,
  }),
];

export default preview;
