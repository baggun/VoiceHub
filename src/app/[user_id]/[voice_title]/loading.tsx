
import { RecommendH3 } from "@common/Heading"; 
import { Container, ContainerFluid } from "@common/Grid"; 
import ScriptBlock from "@components/script/ScriptBlock"; 

import { VoiceBG } from "./page.styled";

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
              <RecommendH3 $marginBottom="1rem"> 성우의 다른 목소리</RecommendH3>
              {/* {tracks.map(track => (
                <AudioBar
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
                <RecommendH3 $marginBottom="1rem">관심을 남긴 사람들</RecommendH3>
                {likers.map(user => (
                  <Profile profileID={user.id} key={`likers-${user.id}`} size={3}></Profile>
                ))}
              </>
            )} */}
            <>
              <RecommendH3 $marginBottom="1rem">이 목소리와 비슷한</RecommendH3>
              {/* {tracks.map(track => (
                <AudioBar
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
