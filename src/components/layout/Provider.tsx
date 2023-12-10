"use client";

import { ThemeProvider } from "styled-components";
import { SessionProvider } from "next-auth/react";
import StyledComponentsRegistry from "@lib/registry";

import theme from "@styles/theme";
import { RecoilRoot } from "recoil";

const Provider = (props: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <RecoilRoot>{props.children}</RecoilRoot>
        </SessionProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Provider;
