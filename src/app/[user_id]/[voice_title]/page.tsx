import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";

import Tag from "@/components/common/tag";
import Profile from "@components/profile";
import Like from "@/components/common/like";
import { RecommendH3 } from "@common/Heading";
import CommentForm from "@common/form/CommentForm";
import AudioWave from "@/components/audio/player/AudioWave";
import { Container, ContainerFluid } from "@common/Grid";
import ProfileInfo from "@components/profile/ProfileInfo";
import ScriptBlock from "@components/script/ScriptBlock";
import ProfileCard from "@components/profile/ProfileCard";
import Comment from "@components/comment";
import AudioBarList, { AudioBarListSkeleton } from "@/components/audio/AudioBarList";
import AudioBar from "@/components/audio/player/AudioBar";

import { getVoice } from "@utils/apis/api/voice";
import { getUsersProcess } from "@utils/apis/services/user";
import { getVoiceProcess } from "@utils/apis/services/voice";
import { getCommentProcess } from "@utils/apis/services/comment";
import { UserData, UserProfileData } from "@type/user";
import { VoiceInfo } from "@type/voice";
import { CommentType } from "@type/comment";
import { SearchParamsProps } from "@/types/props";

import { VoiceTitle, VoiceBG, VoiceFooter } from "./page.styled";
import { profileURL } from "@utils/url";

interface PageProps {
  user_id: string;
  voice_title: string;
}

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: PageProps },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { user_id, voice_title } = params;

  const res = await getVoice(user_id, voice_title);
  const voiceData: VoiceInfo = getVoiceProcess(res.data);

  return {
    title: voiceData.title,
    openGraph: {
      title: voiceData.title,
      description: voiceData.script ? voiceData.script.slice(0, 90) : `${voiceData.ownerName} - ${voiceData.title}`,
      siteName: "VoiceHub",
      images: [
        {
          url: profileURL(voiceData.ownerProfile),
          alt: voiceData.ownerName,
        },
      ],
      type: "website",
    },
  };
}

const Voice = async ({ params }: { params: PageProps }) => {
  const { user_id, voice_title } = params;

  const res = await getVoice(user_id, voice_title);

  if (!res.ok) return notFound();

  const voiceData: VoiceInfo = getVoiceProcess(res.data);
  const comments: CommentType[] = getCommentProcess(res.data.comments);
  let likers: UserData[] = getUsersProcess(res.likes);
  let isOwnerFollowed: boolean = res.isFollow;

  const tracks: VoiceInfo[] = [
    {
      id: "1",
      ownerID: "asdf",
      ownerName: "가나다",
      ownerProfile: "base_profile.png",
      title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
      url: "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3",
    },
    {
      id: "0",
      ownerID: "aaa",
      ownerName: "xvxvxv",
      ownerProfile: "base_profile.png",
      title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
      url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
    },
    {
      id: "2",
      ownerID: "343234",
      ownerName: "111111111111",
      ownerProfile: "base_profile.png",
      title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ];

  return (
    <>
      <ContainerFluid className="pd-none">
        <VoiceBG>
          <Container>
            <div className="row">
              <div className={`${voiceData.script !== "" ? "col-md-7" : "col-12"} audio-info`}>
                <VoiceTitle>{voiceData.title}</VoiceTitle>
                {voiceData.url && <AudioWave audioSrc={voiceData.url} info={{ ...voiceData }} />}
                <VoiceFooter>
                  {voiceData.tags?.map(tag => <Tag key={tag} tag={tag} $darkmode />)}
                  <Like type="Voice" target_id={voiceData.id} likers={likers} />
                </VoiceFooter>
              </div>
              {voiceData.script !== "" && (
                <div className="col-md-5">
                  <ScriptBlock height="400px">{voiceData?.script}</ScriptBlock>
                </div>
              )}
            </div>
          </Container>
        </VoiceBG>
      </ContainerFluid>

      <Container>
        <div className="row">
          <div className="col-md-7">
            <ProfileCard
              id={voiceData.ownerID}
              nickname={voiceData.ownerName}
              profile={voiceData.ownerProfile}
              aboutMe={voiceData.ownerDesc}
              isFollowed={isOwnerFollowed}
              size="lg"
            />
            <hr />
            <CommentForm voice_id={voiceData.id} />
            <div>
              {comments.map((c, idx) => (
                <Comment key={`c-${idx}`} post_id={voiceData.id} comment={c} type="voice" />
              ))}
            </div>
          </div>
          <div className="col-md-5">
            {likers.length > 0 && (
              <>
                <RecommendH3 $marginBottom="1rem">관심을 남긴 사람들</RecommendH3>
                {likers.map(user => (
                  <Profile profileID={user.id} profile_url={user.profile} key={`likers-${user.id}`} size={3}></Profile>
                ))}
              </>
            )}
            <>
              <Suspense fallback={<AudioBarListSkeleton />}>
                <RecommendH3 $marginBottom="1rem">
                  <Link href={`/${tracks[0].ownerID}`}>성우의 다른 목소리</Link>
                </RecommendH3>
                <AudioBarList user_id={user_id} />
              </Suspense>
            </>
            {/* <>
              <RecommendH3 $marginBottom="1rem">이 목소리와 비슷한</RecommendH3>
              {tracks.map(track => (
                <AudioBar
                  audioSrc={track.url}
                  key={track.id}
                  userId={track.ownerID}
                  audioId={track.id}
                  info={{ ...track }}
                />
              ))}
            </> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Voice;
