// "use client";

import Skeleton, { SkeletonGroup, SkeletonWrapper } from "../sekeleton";

import { getVoicesProcess } from "@utils/apis/services/voice";
import { VoiceInfo } from "@type/voice";
import AudioBar from "./player/AudioBar";
import { getUserVoices } from "@utils/apis/api/users";

type AudioBarListProps = {
  user_id: string;
};

const AudioBarList = async ({ user_id }: AudioBarListProps) => {
  const res = await getUserVoices({ user_id, limit: 3 });
  const tracks: VoiceInfo[] = getVoicesProcess(res.data);

  return (
    <>
      {tracks &&
        tracks.map((track) => (
          <AudioBar
            key={track.id}
            audioSrc={track.url}
            userId={track.ownerID}
            audioId={track.id}
            tags={track.tags}
            info={{ ...track }}
          />
        ))}
    </>
  );
};
export default AudioBarList;

export const AudioBarListSkeleton = () => {
  return (
    <div>
      <Skeleton
        height="35px"
        width="10rem"
        $borderRadius="0.5rem"
        style={{
          margin: "1.75rem 0rem 0.25rem 0rem",
        }}
      />
      {Array.from({ length: 3 }, (v, index) => (
        <Skeleton
          height="4.5rem"
          width="100%"
          $borderRadius="0.5rem"
          style={{
            margin: "0.125rem 0rem",
          }}
        />
      ))}
    </div>
  );
};
