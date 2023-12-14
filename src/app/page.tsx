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
      <ContainerFluid className="pd-none">
        <Carousel />
      </ContainerFluid>
      <Container>
        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기있는 성우
        </RecommendH2>
        <Suspense fallback={<ProfileListSkeleton />}>
          <ProfileList />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          오늘 인기있는
        </RecommendH2>
        <Suspense fallback={<AudioAlbumListSkeleton />}>
          <AudioAlbumList />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기 대사
        </RecommendH2>
        <Suspense fallback={<ScriptListSkeleton />}>
          <ScriptList />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          핫한 성우의 다른 작품
        </RecommendH2>
        <Suspense fallback={<AudioAlbumListSkeleton />}>
          <AudioAlbumList />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          요즘 인기 태그
        </RecommendH2>
        <Suspense fallback={<AudioAlbumListSkeleton />}>
          <AudioAlbumList />
        </Suspense>
      </Container>
    </MainLayout>
  );
};
export default Home;
