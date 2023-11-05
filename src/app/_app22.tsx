import React from "react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import theme from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import FooterPlayer from "@/components/audio/FooterPlayer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <FooterPlayer />
    </>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
