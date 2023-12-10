import React, { Suspense } from "react";
import Dynamic from "next/dynamic";

import { MainLayout } from "@components/layout";
import { RecommendH2 } from "@components/common/Heading";
import Carousel from "@components/carousel/BannerCarousel";
import { Container, ContainerFluid } from "@components/common/Grid";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ScriptList, { ScriptListSkeleton } from "@components/script/ScriptList";
import AudioAlbumList, {
  AudioAlbumListSkeleton,
} from "@components/audio/AudioAlbumList";
import ProfileList, {
  ProfileListSkeleton,
} from "@components/profile/ProfileList";
import { Metadata } from "next";
const SuspenseProfileList = Dynamic(
  () => import("@components/profile/ProfileList"),
  {
    loading: () => <ProfileListSkeleton />,
  }
);
const SuspenseAudioAlbumList = Dynamic(
  () => import("@components/audio/AudioAlbumList"),
  {
    loading: () => <AudioAlbumListSkeleton />,
  }
);
const SuspenseScriptList = Dynamic(
  () => import("@components/script/ScriptList"),
  {
    loading: () => <ScriptListSkeleton />,
  }
);

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "보이스허브",
  description: "성우들을 위한 공간, VoiceHub",
  // metadataBase: new URL('/'),
  openGraph: {
    url: "https://voice-hub-beta.vercel.app",
    title: "VoiceHub",
    description: "성우들을 위한 공간, VoiceHub",
    siteName: "VoiceHub",
    images: ["/thumbnail.png"],
    type: "website",
  },
};

const Home = async () => {
  return (
    <MainLayout>
      <ContainerFluid className="pd-none">{/* <Carousel /> */}</ContainerFluid>
      <Container>
        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기있는 성우
        </RecommendH2>
        {/* <Suspense fallback={<ProfileListSkeleton/>}>
          <ProfileList />
        </Suspense> */}
        <SuspenseProfileList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          오늘 인기있는
        </RecommendH2>
        {/* <Suspense>
          <AudioAlbumList />
        </Suspense> */}
        <SuspenseAudioAlbumList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기 대사
        </RecommendH2>
        {/* <Suspense>
          <ScriptList />
        </Suspense> */}
        <SuspenseScriptList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          핫한 성우의 다른 작품
        </RecommendH2>
        {/* <Suspense>
          <AudioAlbumList />
        </Suspense> */}
        <SuspenseAudioAlbumList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          요즘 인기 태그
        </RecommendH2>
        {/* <Suspense>
          <AudioAlbumList />
        </Suspense> */}
        <SuspenseAudioAlbumList />

        {/* {tracks.length > 0 && <AudioWave audioSrc={tracks[0].url} info={{ ...tracks[0] }} />}
        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 있기 있는 성우
        </RecommendH2>
        {tracks.length > 0 && (
          <AudioBar
            audioSrc={tracks[0].url}
            userId={tracks[0].ownerID}
            audioId={tracks[0].id}
            info={{ ...tracks[0] }}
          />
        )} */}
      </Container>
    </MainLayout>
  );
};
export default Home;
