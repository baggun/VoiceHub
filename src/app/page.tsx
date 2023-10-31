
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
import Head from "next/head";
import Image from "next/image";

// async function getVoices() {
//   const res = await fetch('http://localhost:3000/api/voice')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }
import { cookies } from "next/headers";

const Home = async () => {  
  const res =  await getVoices()
  const tracks : VoiceInfo[] = getVoicesProcess(res.data);

  // .then((res) => getVoicesProcess(res.data))
  // .then((res) => setTracks(res))
  // .catch((err) => {
  //   console.log(err);
  // });
  // const [tracks, setTracks] = React.useState<VoiceInfo[]>();

  // React.useEffect(() => {
  //   initVoices();
  // }, []);

  // const initVoices = async () => {
  //   await getVoices()
  //     .then((res) => getVoicesProcess(res.data))
  //     .then((res) => setTracks(res))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <Carousel />
      </ContainerFluid>
      <Container>
        <RecommendH2 $marginTop="4rem">오늘의 대사</RecommendH2>
        {tracks &&
          tracks.map((track) => (
            <AudioFileBar
              key={track.id}
              audioSrc={track.url}
              userId={track.ownerID}
              audioId={track.id}
              info={{ ...track }}
            />
          ))}

        <RecommendH2 $marginTop="4rem">현재 인기있는 목소리</RecommendH2>
        {tracks && (
          <AudioFileBar
            audioSrc={tracks[0].url}
            userId={tracks[0].ownerID}
            audioId={tracks[0].id}
            info={{ ...tracks[0] }}
          />
        )}

        <br />

        {tracks && (
          <AudioWave audioSrc={tracks[0].url} info={{ ...tracks[0] }} />
        )}
        <RecommendH2 $marginTop="4rem">지금 있기 있는 성우</RecommendH2>
        {tracks && (
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
}
export default Home;