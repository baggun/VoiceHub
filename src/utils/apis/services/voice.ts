import { VoiceResponseData } from "@type/response/res_voice";
import { VoiceInfo } from "@type/voice";

export const getVoicesProcess = (data: VoiceResponseData[]): VoiceInfo[] => {
  return data.map(({ author, comments, createdAt, tags, title, voice_src, _id }): VoiceInfo => {
    return {
      title,
      id: _id,
      url: voice_src,
      ownerID: author.user_id,
      ownerName: author.user_nickname,
      ownerProfile: author.user_profile,
      tags,
    };
  });
};

export const getVoiceProcess = (data: VoiceResponseData): VoiceInfo => {
  return {
    id: data._id,
    url: data.voice_src,
    ownerID: data.author.user_id,
    ownerName: data.author.user_nickname,
    ownerProfile: data.author.user_profile,
    ownerDesc: data.author.user_desc,
    title: data.title,
    tags: data.tags,
    script: data.script ? data.script.script : "(대사가 없습니다.)",
  };
};
