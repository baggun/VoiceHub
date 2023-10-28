"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "styled-components";

import theme from "@/styles/theme";
import { RecoilRoot } from "recoil";

const Provider = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <RecoilRoot>{props.children}</RecoilRoot>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Provider;
