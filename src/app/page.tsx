import React, { Suspense } from "react";
import Carousel from "@/components/carousel/BannerCarousel";
import { MainLayout } from "@components/layout";
import AudioWave from "@components/audio/AudioWave";
import { RecommendH2 } from "@components/common/Heading";
import { Container, ContainerFluid } from "@components/common/Grid";
import { AudioFileButton, AudioFileBar, AudioFileAlbum } from "@components/audio/AudioFile";
import { VoiceInfo } from "@type/voice";
import { getVoices } from "@utils/apis/api/voice";
import { getVoicesProcess } from "@utils/apis/services/voice";
import { AudioList } from "@/components/audio/AudioList";
import Profile from "@/components/profile";
import ProfileList from "@/components/profile/ProfileList";
import { getRecommendUser } from "@/utils/apis/api/users";
import { UserData } from "@/types/user";
import { getUsersPureProcess } from "@/utils/apis/services/user";
import { getScripts } from "@/utils/apis/api/script";
import { getScriptsProcess } from "@/utils/apis/services/script";
import ScriptCard from "@/components/script/ScriptCard";
import ScriptList from "@/components/script/ScriptList";

export const dynamic = "force-dynamic";

const Home = async () => {
  const res = await getVoices();
  const tracks: VoiceInfo[] = getVoicesProcess(res.data);

  const resUsers = await getRecommendUser();
  const users: UserData[] = getUsersPureProcess(resUsers.user);

  const reses = await getScripts();
  const scripts = getScriptsProcess(reses.scripts);

  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <Carousel />
      </ContainerFluid>
      <Container>
        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기있는 성우
        </RecommendH2>
        <ProfileList users={users} />

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          오늘 인기있는
        </RecommendH2>
        <Suspense fallback={<p>load</p>}>
          <AudioList tracks={tracks} />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 인기 대사
        </RecommendH2>
        <Suspense fallback={<p>load</p>}>
          <ScriptList scripts={scripts} />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          핫한 성우의 다른 작품
        </RecommendH2>
        <Suspense fallback={<p>load</p>}>
          <AudioList tracks={tracks} />
        </Suspense>

        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          요즘 인기 태그
        </RecommendH2>
        <Suspense fallback={<p>load</p>}>
          <AudioList tracks={tracks} />
        </Suspense>

        {/* {tracks.length > 0 && <AudioWave audioSrc={tracks[0].url} info={{ ...tracks[0] }} />}
        <RecommendH2 $marginTop="4rem" $marginBottom="1rem">
          지금 있기 있는 성우
        </RecommendH2>
        {tracks.length > 0 && (
          <AudioFileBar
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
