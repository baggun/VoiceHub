import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Tag from "@components/common/tag";
import Like from "@components/common/like";
import { MainLayout } from "@components/layout";
import ScriptCard from "@components/script/ScriptCard";
import ScriptBlock from "@components/script/ScriptBlock";
import AudioBar from "@components/audio/player/AudioBar";
import { Container, ContainerFluid } from "@components/common/Grid";

import { getUsersProcess } from "@utils/apis/services/user";
import { getScript, getScripts } from "@utils/apis/api/script";
import {
  getScriptProcess,
  getScriptsProcess,
} from "@utils/apis/services/script";
import { ScriptType } from "@type/scripts";
import { UserData } from "@type/user";

import {
  AudioScroller,
  ScriptBG,
  ScriptBody,
  ScriptHeader,
  ScriptTitle,
} from "./page.styled";
import { AudioInfo } from "@type/voice";
import { getVoicesProcess } from "@utils/apis/services/voice";
import { Metadata } from "next";

interface PageProps {
  slug?: string[];
}

type RelationType = AudioInfo & {
  url: string;
};

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const script_id = params?.slug?.[0] || "";

  if (script_id) {
    const res = await getScript(script_id);
    if (!res.ok) return notFound();

    const curScript = getScriptProcess(res.script);

    return {
      title: curScript.title,
      openGraph: {
        title: curScript.title,
        description: curScript.script
          ? curScript.script.slice(0, 90)
          : `${"#" + curScript.tags.join(" #")}`,
        siteName: "VoiceHub",
        images: [
          "https://raw.githubusercontent.com/baggun/VoiceHub/master/public/thumbnail.png",
        ],
        type: "website",
      },
    };
  }

  return {
    title: "보이스허브",
    description: "성우들을 위한 공간, VoiceHub",
    openGraph: {
      url: "https://voice-hub-beta.vercel.app",
      title: "VoiceHub | 대본",
      description: "성우들을 위한 공간, VoiceHub",
      siteName: "VoiceHub",
      images: [
        "https://raw.githubusercontent.com/baggun/VoiceHub/master/public/thumbnail.png",
      ],
      type: "website",
    },
  };
}

const Script = async ({ params }: { params: PageProps }) => {
  const script_id = params?.slug?.[0] || "";

  const reses = await getScripts();

  const scripts = getScriptsProcess(reses.scripts);

  let curScript: ScriptType | null = null;
  let likers!: UserData[];
  let relationTracks: RelationType[] = [];

  if (script_id) {
    const res = await getScript(script_id);
    if (!res.ok) return notFound();

    curScript = getScriptProcess(res.script);

    if (res.likes) likers = getUsersProcess(res.likes);
    if (res.voices) relationTracks = getVoicesProcess(res.voices);
  }

  // const relationTracks: RelationType[] = [
  //   {
  //     id: "1",
  //     ownerID: "asdf",
  //     ownerName: "가나다",
  //     ownerProfile: "",
  //     title: "Hello .. - Voice (Clarinet) & Piano",
  //     url: "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3",
  //   },
  //   {
  //     id: "0",
  //     ownerID: "aaa",
  //     ownerName: "xvxvxv",
  //     ownerProfile: "",
  //     title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
  //     url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  //   },
  // ];

  return (
    <>
      {script_id && curScript && (
        <ContainerFluid className="pd-none">
          <ScriptBG>
            <Container>
              <div className="row">
                <div className="col-lg-6">
                  <ScriptTitle>{curScript.title}</ScriptTitle>
                  <ScriptBlock height="450px">{curScript.script}</ScriptBlock>
                  {curScript.tags?.map((tag) => (
                    <Tag key={tag} tag={tag} $darkmode />
                  ))}
                </div>
                <div className="col-lg-6">
                  <ScriptHeader>
                    <Link href={`/voice/upload?script=${curScript.id}`}>
                      이 대사로 업로드
                    </Link>
                    <Like type="Script" target_id={script_id} likers={likers} />
                  </ScriptHeader>
                  <ScriptBody>
                    <h2>관련 목소리</h2>
                    <AudioScroller className="scroll dark">
                      {relationTracks.map((track) => (
                        <AudioBar
                          key={`track-${track.id}`}
                          audioSrc={track.url}
                          userId={track.ownerID}
                          audioId={track.id}
                          info={{ ...track }}
                        />
                      ))}
                    </AudioScroller>
                  </ScriptBody>
                </div>
              </div>
            </Container>
          </ScriptBG>
        </ContainerFluid>
      )}
      <Container>
        <div className="row">
          {scripts.map((sc) => (
            <ScriptCard
              key={`script-${sc.id}`}
              className="col-md-6"
              script={sc}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Script;
