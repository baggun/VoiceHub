"use client";

import styled from "styled-components";

export const VoiceTitle = styled.h1`
  margin-bottom: 1rem;
`;
export const VoiceBG = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark_bg};
  padding: 3rem 0rem;
  .audio-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    ${({ theme }) => theme.devices.max_tablet} {
      height: 350px;
      margin-bottom: 2rem;
    }
  }
`;
export const VoiceFooter = styled.div`
  min-height: 1.5rem;
`;
export const Commet = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin: 1.5rem 0rem;
`;
