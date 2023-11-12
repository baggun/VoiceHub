"use client";

import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset"; // normalize쓸지 고민하다가 reset 으로 결정

import grid from "./yuri-grid.ts";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    
    ${({ theme }) => {
      return css` 

        *,
        ::after,
        ::before {
          box-sizing: border-box;
        }

        :root {
          --primaryColor: ${theme.colors.primary};
          --secondaryColor: ${theme.colors.secondary};
          --greyColor: ${theme.colors.grey};
          --blackColor: ${theme.colors.black};
          --bgColor: ${theme.colors.bg};
          --lightPrimaryColor: ${theme.colors.lightPrimary};
          --lightGreyColor: ${theme.colors.lightGrey};
        }

        input,
        textarea {
          font-family: ${theme.fonts.family.base};
        }
        body {
          margin: 0px;
          font-family: ${theme.fonts.family.base};
          line-height: 1.5;
          ${theme.devices.desktop} {
            // background: ${theme.colors.bg};
          }
        }

        ::selection {
          background: ${theme.colors.primary};
          color: white;
        }
        ::-moz-selection {
          background: ${theme.colors.primary};
          color: white;
        }

        a {
          // color: ${theme.colors.primary};
          color: black;
          text-decoration: none;
        }
        span {
          line-height: 1;
        }
        h1 {
          font-size: 2em;
          font-weight: bold;
          line-height: 1.2;
        }
        h2 {
          font-size: 1.5em;
          font-weight: 600;
          line-height: 1.2;
        }
        h3 {
          font-size: 1.17em;
          font-weight: 500;
          line-height: 1.2;
        }
        h4 {
          font-size: 1em;
          line-height: 1.2;
        }
        h5 {
          font-size: 0.83em;
          line-height: 1.2;
        }
        h6 {
          font-size: 0.75em;
          line-height: 1.2;
        }
        b,
        strong {
          font-weight: bold;
        }
        i,
        em {
          font-style: italic;
        }
        hr {
          margin: 0px;
        }
        button {
          cursor: pointer;
          font-family: ${theme.fonts.family.base};
        }

        ol {
          display: block;
          list-style-type: decimal;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
        }

        blockquote {
          margin: 0 0 1rem;
          padding-top: 5px;
          padding-bottom: 2px;
          padding-left: 14px;
          border-left: ${theme.colors.primary} 4px solid;
          background-color: #f6fff5;
        }

        .disabled-link {
          pointer-events: none;
        }
        /* 

            class Utilities
        
        */
        .primary {
          color: ${theme.colors.primary};
        }
        .outline-none {
          outline: none;
        }
        .d-none {
          display: none !important;
        }
        .d-flex {
          display: flex !important;
        }
        .f-column {
          flex-direction: column;
        }
        .f-row {
          flex-direction: row;
        }
        .align-content-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .justify-between {
          justify-content: space-between;
        }
        .p-relative {
          position: relative;
        }
        .mg-1 {
          margin: 1rem;
        }
        .mg-2 {
          margin: 2rem;
        }
        .mg-3 {
          margin: 3rem;
        }
        .mg-l-1 {
          margin-left: 1rem;
        }
        .mg-l-2 {
          margin-left: 2rem;
        }
        .mg-l-3 {
          margin-left: 3rem;
        }
        .mg-r-1 {
          margin-right: 1rem;
        }
        .mg-r-2 {
          margin-right: 2rem;
        }
        .mg-r-3 {
          margin-right: 3rem;
        }
        .mg-t-1 {
          margin-top: 1rem;
        }
        .mg-t-2 {
          margin-top: 2rem;
        }
        .mg-t-3 {
          margin-top: 3rem;
        }
        .mg-b-1 {
          margin-bottom: 1rem;
        }
        .mg-b-2 {
          margin-bottom: 2rem;
        }
        .mg-b-3 {
          margin-bottom: 3rem;
        }

        .hide-sm {
          ${theme.devices.max_mobile} {
            display: none !important;
          }
        }
        .hide-md {
          ${theme.devices.max_tablet} {
            display: none !important;
          }
        }
        .hide-lg {
          ${theme.devices.max_desktop} {
            display: none !important;
          }
        }
        .hide-xl {
          ${theme.devices.max_desktopLarge} {
            display: none !important;
          }
        }
        .show-sm {
          ${theme.devices.mobile} {
            display: none !important;
          }
        }
        .show-md {
          ${theme.devices.tablet} {
            display: none !important;
          }
        }
        .show-lg {
          ${theme.devices.desktop} {
            display: none !important;
          }
        }
        .show-xl {
          ${theme.devices.desktopLarge} {
            display: none !important;
          }
        }

        .scroll {
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #787878;
            border-radius: 10px;
          }
          &::-webkit-scrollbar-track {
            background-color: #bdbdbd;
            border-radius: 10px;
            background-clip: padding-box;
          }
          &.dark::-webkit-scrollbar-thumb {
            background-color: #bdbdbd;
            border-radius: 10px;
          }
          &.dark::-webkit-scrollbar-track {
            background-color: #787878;
            border-radius: 10px;
            background-clip: padding-box;
          }
          &.light::-webkit-scrollbar-thumb {
            background-color: #bdbdbd;
          }
          &.light::-webkit-scrollbar-track {
            background-color: white;
          }
        }
      `;
    }}
    
    ${grid}
`;
