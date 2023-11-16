import Carousel from "../carousel";
import { AudioFileAlbum } from "./AudioFile";
import Skeleton, { SkeletonGroup, SkeletonWrapper } from "../sekeleton";

import { getVoices } from "@utils/apis/api/voice";
import { getVoicesProcess } from "@utils/apis/services/voice";
import { VoiceInfo } from "@/types/voice";

const AudioList = async () => {
  const res = await getVoices();
  const tracks: VoiceInfo[] = getVoicesProcess(res.data);

  var setting = {
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          draggable: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          draggable: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Carousel setting={setting}>
      {tracks &&
        tracks.map(track => (
          <AudioFileAlbum
            key={track.id}
            audioSrc={track.url}
            userId={track.ownerID}
            audioId={track.id}
            tags={track.tags}
            info={{ ...track }}
          />
        ))}
    </Carousel>
  );
};
export default AudioList;

export const AudioListSkeleton = () => {
  return (
    <SkeletonWrapper $overflow>
      {Array.from({ length: 6 }, (v, index) => (
        <SkeletonGroup key={index}>
          <Skeleton
            height="11rem"
            width="11rem"
            style={{
              margin: "0rem 0.5rem 0rem 0rem",
            }}
          />
          <Skeleton height="1rem" width="6rem" style={{ margin: "0.5rem 0rem 0rem 0rem" }} />
          <Skeleton height="1rem" width="3rem" style={{ margin: "0.5rem 0rem 0rem 0rem" }} />
        </SkeletonGroup>
      ))}
    </SkeletonWrapper>
  );
};
