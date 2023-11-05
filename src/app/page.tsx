import React from "react";
import Carousel from "@components/carousel";
import { MainLayout } from "@components/layout";
import AudioWave from "@components/audio/AudioWave";
import { RecommendH2 } from "@components/common/Heading";
import { Container, ContainerFluid } from "@components/common/Grid";
import { AudioFileButton, AudioFileBar } from "@components/audio/AudioFile";
import { VoiceInfo } from "@type/voice";
import { getVoices } from "@apis/api/voice";
import { getVoicesProcess } from "@apis/services/voice";

const Home = async () => {
  const res = await getVoices();
  const tracks: VoiceInfo[] = getVoicesProcess(res.data);

  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <Carousel />
      </ContainerFluid>
      <Container>
        <RecommendH2 $marginTop="4rem">오늘의 대사</RecommendH2>
        {tracks &&
          tracks.map(track => (
            <AudioFileBar
              key={track.id}
              audioSrc={track.url}
              userId={track.ownerID}
              audioId={track.id}
              info={{ ...track }}
            />
          ))}

        <RecommendH2 $marginTop="4rem">현재 인기있는 목소리</RecommendH2>
        {tracks.length > 0 && (
          <AudioFileBar
            audioSrc={tracks[0].url}
            userId={tracks[0].ownerID}
            audioId={tracks[0].id}
            info={{ ...tracks[0] }}
          />
        )}

        <br />

        {tracks.length > 0 && <AudioWave audioSrc={tracks[0].url} info={{ ...tracks[0] }} />}
        <RecommendH2 $marginTop="4rem">지금 있기 있는 성우</RecommendH2>
        {tracks.length > 0 && (
          <AudioFileBar
            audioSrc={tracks[0].url}
            userId={tracks[0].ownerID}
            audioId={tracks[0].id}
            info={{ ...tracks[0] }}
          />
        )}
      </Container>
    </MainLayout>
  );
};
export default Home;
