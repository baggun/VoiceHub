"use client"; 
import Carousel from "../carousel";
import { ScriptType } from "@/types/scripts";
import ScriptCard from "./ScriptCard";

type ScriptListProps = {
  scripts: ScriptType[];
};

const ScriptList = ({ scripts }: ScriptListProps) => {
  var setting = {
    slidesToShow: 2,
    slidesToScroll: 2, 
  };

  return (
    <Carousel setting={setting}>
      {scripts.map(sc => (
        <ScriptCard key={`script-${sc.id}`}  script={sc} $fixedWidth="30rem"/>
      ))}
    </Carousel>
  );
};

export default ScriptList;
