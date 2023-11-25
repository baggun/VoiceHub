import React, { Suspense } from "react";
import Dynamic from "next/dynamic";

import { MainLayout } from "@components/layout";
import { RecommendH2 } from "@components/common/Heading";
import Carousel from "@/components/carousel/BannerCarousel";
import { Container, ContainerFluid } from "@components/common/Grid";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ScriptListSkeleton } from "@components/script/ScriptList";
import { AudioAlbumListSkeleton } from "@components/audio/AudioAlbumList";
import { ProfileListSkeleton } from "@components/profile/ProfileList";
const SuspenseProfileList = Dynamic(() => import("@components/profile/ProfileList"), {
  ssr: false,
  loading: () => <ProfileListSkeleton />,
});
const SuspenseAudioAlbumList = Dynamic(() => import("@components/audio/AudioAlbumList"), {
  ssr: false,
  loading: () => <AudioAlbumListSkeleton />,
});
const SuspenseScriptList = Dynamic(() => import("@components/script/ScriptList"), {
  ssr: false,
  loading: () => <ScriptListSkeleton />,
});

export const dynamic = "force-dynamic";

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
        <SuspenseProfileList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          오늘 인기있는
        </RecommendH2>
        <SuspenseAudioAlbumList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기 대사
        </RecommendH2>
        <SuspenseScriptList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          핫한 성우의 다른 작품
        </RecommendH2>
        <SuspenseAudioAlbumList />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          요즘 인기 태그
        </RecommendH2>
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
