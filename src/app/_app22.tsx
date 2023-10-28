import type { AppProps } from "next/app";
import styled, { ThemeProvider } from "styled-components";
import { RecoilRoot, useRecoilValue } from "recoil";
// import { createStore, applyMiddleware } from "redux";
// import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { GlobalStyle } from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import { audioState } from "@/recoil/audio/atom";
import FooterPlayer from "@/components/audio/FooterPlayer";
import React from "react";

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
