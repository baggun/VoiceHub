import React from "react";
import Link from "next/link";

import Tag from "@/components/common/tag";
import Profile from "@components/profile";
import { RecommendH2 } from "@common/Heading";
import { MainLayout } from "@components/layout";
import CommentForm from "@common/form/CommentForm";
import AudioWave from "@components/audio/AudioWave";
import { Container, ContainerFluid } from "@common/Grid";
import { AudioFileBar } from "@components/audio/AudioFile";
import ProfileInfo from "@components/profile/ProfileInfo";
import ScriptBlock from "@components/script/ScriptBlock";
import ProfileCard from "@components/profile/ProfileCard";
import Like from "@/components/common/like";

// import { getVoice, voiceLike } from "@apis/api/voice";
import { getUsersProcess } from "@apis/services/user";
import { getVoiceProcess } from "@apis/services/voice";
import { getCommentProcess } from "@apis/services/comment";
import { UserData } from "@type/user";
import { VoiceInfo } from "@type/voice";
import { CommentType } from "@type/comment";

import { VoiceTitle, VoiceBG, VoiceFooter, Commet } from "./page.styled";
import { headers } from "next/headers";

interface PageProps {
  user_id: string;
  voice_title: string;
}

export const dynamic = "force-dynamic";
// export const revalidate = 0;
async function getVoice(user_id: string, title: string) {
  // const myCookie = cookies().get("connect.sid")?.value;
  // console.log('111111');

  const res = await fetch(
    "http://localhost:3000/api" + `/voice/${user_id}/${title}`,
    {
      headers: headers(),
      // headers: {
      //   Cookie: `connect.sid=${myCookie}`,
      // },
      // cache: 'no-store',
      // next: { revalidate: 0 }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Voice = async ({ params }: { params: PageProps }) => {
  const { user_id, voice_title } = params;

  const res = await getVoice(user_id, voice_title);

  const voiceData: VoiceInfo = getVoiceProcess(res.data);
  const comments: CommentType[] = getCommentProcess(res.data.comments);
  let likers: UserData[] = getUsersProcess(res.likes);
  let isOwnerFollowed: boolean = res.isFollow;

  const tracks: VoiceInfo[] = [
    {
      id: "1",
      ownerID: "asdf",
      ownerName: "가나다",
      title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
      url: "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3",
    },
    {
      id: "0",
      ownerID: "aaa",
      ownerName: "xvxvxv",
      title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
      url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
    },
    {
      id: "2",
      ownerID: "343234",
      ownerName: "111111111111",
      title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ];

  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <VoiceBG>
          <Container>
            <div className="row">
              <div
                className={`${
                  voiceData.script !== "" ? "col-md-7" : "col-12"
                } audio-info`}
              >
                <VoiceTitle>{voiceData.title}</VoiceTitle>
                {voiceData.url && (
                  <AudioWave audioSrc={voiceData.url} info={{ ...voiceData }} />
                )}
                <VoiceFooter>
                  {voiceData.tags?.map((tag) => (
                    <Tag key={tag} tag={tag} $darkmode />
                  ))}
                  <Like type="Voice" target_id={voiceData.id} likers={likers} />
                </VoiceFooter>
              </div>
              {voiceData.script !== "" && (
                <div className="col-md-5">
                  <ScriptBlock>{voiceData?.script}</ScriptBlock>
                </div>
              )}
            </div>
          </Container>
        </VoiceBG>
      </ContainerFluid>

      <Container>
        <div className="row">
          <div className="col-md-8">
            <ProfileCard
              id={voiceData.ownerID}
              nickname={voiceData.ownerName}
              aboutMe={voiceData.ownerDesc}
              isFollowed={isOwnerFollowed}
              size="lg"
            />
            <hr />
            <CommentForm voice_id={voiceData.id} />
            <div>
              {comments.map((comment, idx) => {
                return (
                  <Commet key={`comment_${idx}`}>
                    <ProfileInfo
                      profileID={comment.user.id}
                      nickname={comment.user.nickname}
                      size={3}
                    >
                      <p>{comment.content}</p>
                    </ProfileInfo>
                  </Commet>
                );
              })}
            </div>
          </div>
          <div className="col-md-4">
            <>
              <RecommendH2 $marginBottom="1rem">
                <Link href={`/${tracks[0].ownerID}`}>성우의 다른 목소리</Link>
              </RecommendH2>
              {tracks.map((track) => (
                <AudioFileBar
                  key={track.id}
                  audioSrc={track.url}
                  userId={track.ownerID}
                  audioId={track.id}
                  info={{ ...track }}
                />
              ))}
            </>
            {likers.length > 0 && (
              <>
                <RecommendH2 $marginBottom="1rem">
                  관심을 남긴 사람들
                </RecommendH2>
                {likers.map((user) => (
                  <Profile
                    profileID={user.id}
                    key={`likers-${user.id}`}
                    size={3}
                  ></Profile>
                ))}
              </>
            )}
            <>
              <RecommendH2 $marginBottom="1rem">이 목소리와 비슷한</RecommendH2>
              {tracks.map((track) => (
                <AudioFileBar
                  audioSrc={track.url}
                  key={track.id}
                  userId={track.ownerID}
                  audioId={track.id}
                  info={{ ...track }}
                />
              ))}
            </>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Voice;

// const VoiceTitle = styled.h1`
//   margin-bottom: 1rem;
// `;
// const VoiceBG = styled.div`
//   position: relative;
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.dark_bg};
//   padding: 3rem 0rem;
//   .audio-info {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     color: white;
//     ${({ theme }) => theme.devices.max_tablet} {
//       height: 350px;
//       margin-bottom: 2rem;
//     }
//   }
// `;
// const VoiceFooter = styled.div`
//   min-height: 1.5rem;
// `;
// const Commet = styled.div`
//   display: flex;
//   -webkit-box-align: center;
//   align-items: center;
//   margin: 1rem 0rem;
// `;
