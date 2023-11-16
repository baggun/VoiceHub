"use client";
import Carousel from "../carousel";
import { ScriptType } from "@/types/scripts";
import ScriptCard from "./ScriptCard";
import Skeleton, { SkeletonGroup, SkeletonWrapper } from "../sekeleton";

import { getScripts } from "@/utils/apis/api/script";
import { getScriptsProcess } from "@/utils/apis/services/script";

const ScriptList = async () => {
  const reses = await getScripts();
  const scripts: ScriptType[] = getScriptsProcess(reses.scripts);

  var setting = {
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Carousel setting={setting}>
      {scripts.map(sc => (
        <ScriptCard key={`script-${sc.id}`} script={sc} $fixedWidth="30rem" />
      ))}
    </Carousel>
  );
};

export default ScriptList;

export const ScriptListSkeleton = () => {
  return (
    <SkeletonWrapper $overflow>
      {Array.from({ length: 4 }, (v, index) => (
        <SkeletonGroup key={index} $align="center">
          <Skeleton
            height="21rem"
            width="30rem"
            style={{
              margin: "0rem 0.5rem 0rem 0rem",
            }}
          />
        </SkeletonGroup>
      ))}
    </SkeletonWrapper>
  );
};
