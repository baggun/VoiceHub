"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import Label from "@/components/common/Label";
import { H1 } from "@common/Heading";
import { Button } from "@common/button";
import { Input } from "@components/common/input";
import { UploadLayout } from "@components/layout";
import AudioWave from "@/components/audio/player/AudioWave";
import { UploadCard } from "@components/common/card";
import { Container, ContainerFluid } from "@common/Grid";
import { FormGroup } from "@components/common/form/Form";
import Selector, { OptionType } from "@common/input/Selector";
import DragDropFile from "@components/common/input/DragDropFile";
import ScriptBlock from "@components/script/ScriptBlock";
import ScriptTextarea from "@/components/common/textarea/ScriptTextarea";

import useStage from "@hooks/useStage";
import { postVoice } from "@utils/apis/api/voice";
import { getScript, postScript } from "@utils/apis/api/script";
import { VoiceInfo } from "@type/voice";

const VoiceUpload = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const script: string | null = searchParams.get("script");

  const [voiceData, setVoiceData] = React.useState<VoiceInfo>({
    id: "",
    ownerID: "", // Upload 때는 항상 공란이어야 함.
    ownerName: "", // Upload 때는 항상 공란이어야 함.
    ownerProfile: "",
    title: "",
    url: "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3",
    script: "",
    tags: [],
  });

  const [selectorValue, setSelectorValue] = React.useState<readonly OptionType[]>([]);
  const [uploadFile, setUploadFiles] = React.useState<FileList>();
  const { stage, nextStage, ifStage } = useStage({
    // stages: ["voice", "detail"],
    stages: ["detail"],
    endEvent: () => {
      // stage end event
      console.log("stage end");
    },
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const voiceTags: string[] = selectorValue.map(v => v.value);
    let script_id = script || "";

    if (!script) {
      const scriptRes = await postScript(voiceData.title, voiceData.script || "", voiceTags);
      if (scriptRes && scriptRes.success) script_id = scriptRes.data;
    }

    const res = await postVoice(voiceData.title, voiceData.url, script_id, voiceTags);
    if (res && res.success) {
      router.push(res.data);
    }
  };

  const initScript = async () => {
    if (!script) return;
    const res = await getScript(script);
    if (res && res.success) {
      setVoiceData({ ...voiceData, script: res.script.script });
    }
  };

  React.useEffect(() => {
    initScript();
  }, [script]);

  return (
    <UploadLayout>
      <ContainerFluid className="pd-none">
        <Container>
          <UploadCard>
            <H1>목소리 업로드</H1>
            <form onSubmit={submitHandler}>
              {/* 
                                1. 목소리 업로드
                            */}
              <div {...ifStage("voice")}>
                <DragDropFile
                  onUpload={(files: FileList) => setUploadFiles(files)}
                  count={2}
                  formats={["mp3", "wav", "flac", "ogg"]}
                  value={uploadFile}
                ></DragDropFile>
                <Button
                  type="button"
                  onClick={nextStage}
                  $margin="1rem 0rem 0rem 0rem"
                  $float="right"
                  disabled={!(uploadFile && uploadFile?.length > 0)}
                >
                  다음
                </Button>
              </div>

              {/*
                                2. 세부 작성
                                   소리 업로드를 해야 됨
                            */}
              <div className="row" {...ifStage("detail")}>
                <div className="col-lg-7 audio-info">
                  <FormGroup>
                    <Label>목소리</Label>
                    <AudioWave
                      audioSrc={"https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"}
                      info={{
                        ...voiceData,
                        ownerName: session?.user.nickname || "",
                      }}
                      $darkmode={true}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="inputScript">대사</Label>
                    <ScriptTextarea
                      id="inputScript"
                      value={voiceData.script}
                      onChange={e =>
                        setVoiceData({
                          ...voiceData,
                          script: e.target.value,
                        })
                      }
                      disabled={script !== null}
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-5" {...ifStage("detail")}>
                  <FormGroup>
                    <Label htmlFor="inputTitle">제목</Label>
                    <Input
                      id="inputTitle"
                      value={voiceData.title}
                      onChange={e =>
                        setVoiceData({
                          ...voiceData,
                          title: e.target.value,
                        })
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>태그</Label>
                    <Selector id="inputTags" value={selectorValue} setValue={setSelectorValue} />
                  </FormGroup>
                  <Button
                    type="submit"
                    $margin="1rem 0rem 0rem 0rem"
                    $float="right"
                    disabled={
                      !(
                        // uploadFile &&
                        // uploadFile?.length > 0 &&
                        (voiceData.title.length > 0)
                      )
                    }
                  >
                    완료
                  </Button>
                </div>
              </div>
            </form>
          </UploadCard>
        </Container>
      </ContainerFluid>
      {/* <FooterPlayer></FooterPlayer> */}
    </UploadLayout>
  );
};

export default VoiceUpload;
