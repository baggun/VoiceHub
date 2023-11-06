import Tag from "@/components/common/tag";
import Profile from "@components/profile";
import Like from "@/components/common/like";
import { RecommendH2 } from "@common/Heading";
import { MainLayout } from "@components/layout";
import CommentForm from "@common/form/CommentForm";
import AudioWave from "@components/audio/AudioWave";
import { Container, ContainerFluid } from "@common/Grid";
import { AudioFileBar } from "@components/audio/AudioFile";
import ProfileInfo from "@components/profile/ProfileInfo";
import ScriptBlock from "@components/script/ScriptBlock";
import ProfileCard from "@components/profile/ProfileCard";

import { getVoice } from "@apis/api/voice";
import { getUsersProcess } from "@apis/services/user";
import { getVoiceProcess } from "@apis/services/voice";
import { getCommentProcess } from "@apis/services/comment";
import { UserData } from "@type/user";
import { VoiceInfo } from "@type/voice";
import { CommentType } from "@type/comment";

import { VoiceTitle, VoiceBG, VoiceFooter, Commet } from "./page.styled";

export default function Loading() {
  return (
    <>
      <ContainerFluid className="pd-none">
        <VoiceBG>
          <Container>
            <div className="row">
              <div className="col-md-7 audio-info">
                {/* <VoiceTitle>{voiceData.title}</VoiceTitle>
                {voiceData.url && <AudioWave audioSrc={voiceData.url} info={{ ...voiceData }} />}
                <VoiceFooter>
                  {voiceData.tags?.map(tag => <Tag key={tag} tag={tag} $darkmode />)}
                  <Like type="Voice" target_id={voiceData.id} likers={likers} />
                </VoiceFooter> */}
              </div>
              <div className="col-md-5">
                <ScriptBlock height="400px"> </ScriptBlock>
              </div>
            </div>
          </Container>
        </VoiceBG>
      </ContainerFluid>

      <Container>
        <div className="row">
          <div className="col-md-8">
            {/* <ProfileCard
              id={voiceData.ownerID}
              nickname={voiceData.ownerName}
              aboutMe={voiceData.ownerDesc}
              isFollowed={isOwnerFollowed}
              size="lg"
            /> */}
            <hr />
            {/* <CommentForm voice_id={voiceData.id} /> */}
            <div>
              {/* {comments.map((comment, idx) => {
                return (
                  <Commet key={`comment_${idx}`}>
                    <ProfileInfo profileID={comment.user.id} nickname={comment.user.nickname} size={3}>
                      <p>{comment.content}</p>
                    </ProfileInfo>
                  </Commet>
                );
              })} */}
            </div>
          </div>
          <div className="col-md-4">
            <>
              <RecommendH2 $marginBottom="1rem"> 성우의 다른 목소리</RecommendH2>
              {/* {tracks.map(track => (
                <AudioFileBar
                  key={track.id}
                  audioSrc={track.url}
                  userId={track.ownerID}
                  audioId={track.id}
                  info={{ ...track }}
                />
              ))} */}
            </>
            {/* {likers.length > 0 && (
              <>
                <RecommendH2 $marginBottom="1rem">관심을 남긴 사람들</RecommendH2>
                {likers.map(user => (
                  <Profile profileID={user.id} key={`likers-${user.id}`} size={3}></Profile>
                ))}
              </>
            )} */}
            <>
              <RecommendH2 $marginBottom="1rem">이 목소리와 비슷한</RecommendH2>
              {/* {tracks.map(track => (
                <AudioFileBar
                  audioSrc={track.url}
                  key={track.id}
                  userId={track.ownerID}
                  audioId={track.id}
                  info={{ ...track }}
                />
              ))} */}
            </>
          </div>
        </div>
      </Container>
    </>
  );
}