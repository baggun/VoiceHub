"use client";

import { VoiceInfo } from "@/types/voice";
import { AudioFileAlbum } from "./AudioFile";
import Carousel from "../carousel";

type AudioListProps = {
  tracks: VoiceInfo[];
};
export const AudioList = ({ tracks }: AudioListProps) => {
  if (tracks.length === 0) return <></>;

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
