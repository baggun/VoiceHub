"use client";

import styled from "styled-components";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { Link } from "react-router-dom";
import Profile from "@components/profile";
import ProgressBar from "./ProgressBar";
import Volume from "./Volume";
// import { RootState } from "@modules/index";
// import { setPlay } from "@modules/audio";
import { Button } from "@components/common/button";
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { audioInfoState, audioPlayState, audioState } from "@recoil/audio/atom";
import React from "react";

type SafetyLinkProps = {
  to: string;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
};
const SafetyLink = ({
  to,
  active = true,
  className,
  children,
}: SafetyLinkProps) => {
  if (to === "" || !active)
    return <span className={className}>{children}</span>;
  return (
    <Link href={to} className={className}>
      {children}
    </Link>
  );
};

const FooterPlayer = () => {
  const audio = useRecoilValue(audioState);
  const audioInfo = useRecoilValue(audioInfoState);
  const [play, setPlay] = useRecoilState(audioPlayState);

  if (audio.audio === "") return <></>;
  return (
    <PlayerBlock>
      <AudioInfoDiv>
        <Profile
          profileID={audioInfo.ownerID}
          profile_url={audioInfo.ownerProfile}
          $marginRight="1rem"
        ></Profile>
        <div className="d-flex f-column">
          <SafetyLink to={audioInfo.ownerID} className="audio-username">
            {audioInfo.ownerName}
          </SafetyLink>
          <SafetyLink
            to={`/${audioInfo.ownerID}/${audioInfo.title}`}
            active={!!audioInfo.ownerID && !!audioInfo.title}
            className="audio-title"
          >
            {audioInfo.title}
          </SafetyLink>
        </div>
      </AudioInfoDiv>
      <ProgressBar />
      <ControllerDiv>
        <Button
          variant="transparent"
          onClick={() => {
            // dispatch(setPlay(!audioIsPlay));
            setPlay(!play);
          }}
        >
          {play ? (
            <IconPlayerPauseFilled className="icon" />
          ) : (
            <IconPlayerPlayFilled className="icon" />
          )}
        </Button>
      </ControllerDiv>
      <Volume />
    </PlayerBlock>
  );
};

export default React.memo(FooterPlayer);

const PlayerBlock = styled.div`
  position: fixed;
  height: 4rem;
  width: 100%;
  bottom: 0px;
  background: rgb(149, 61, 147);
  background: linear-gradient(to right, #1e1e1e 0%, #1f2041 50%, #1e1e1e 100%);
  z-index: ${({ theme }) => theme.zIndex.footerPlayer};
`;

const AudioInfoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translate(0px, -50%);
  display: inline-flex;
  vertical-align: top;
  // margin: 10px 0 0 10px;
  align-items: center;
  color: white;
  .audio-username {
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .audio-title {
    color: white;
    font-size: 0.75rem;
    font-weight: 300;
  }
`;
const ControllerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  .icon {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
