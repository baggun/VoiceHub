import { useState } from "react";

type useStageProps = {
  stages: string[];
  endEvent: () => void;
};

const useStage = ({ stages, endEvent }: useStageProps) => {
  const [stage, setStage] = useState<number>(0);

  const nextStage = () => {
    console.log("1");
    let curStage = stage + 1;
    if (curStage >= stages.length) {
      endEvent();
      return;
    }
    setStage(curStage);
  };

  const ifStage = (checkStage: string) => {
    if (stages[stage] !== checkStage)
      return {
        style: {
          display: "none",
        },
      };
    return {};
  };

  return { stage: stages[stage], nextStage, ifStage };
};

export default useStage;
