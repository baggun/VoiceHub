// 오디오 플레이어에 보여질 기본 정보
export type AudioInfo = {
  id: string;
  ownerID: string;
  ownerName: string;
  ownerProfile: string;
  ownerDesc?: string;
  title: string;
};

// 목소리 데이터로 보여질 정보
export type VoiceInfo = AudioInfo & {
  url: string;
  script?: string;
  tags?: string[];
};
