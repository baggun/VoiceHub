import { ScriptResponseData } from "@type/response/res_script";
import { ScriptBaseType, ScriptType } from "@type/scripts";

export const getScriptsProcess = (data: ScriptResponseData[]): ScriptType[] => {
  return data.map(({ _id, title, script, tags, createdAt, likeCount, voiceCount, likedByUser }): ScriptType => {
    return {
      title,
      id: _id,
      script,
      tags,
      likeCount,
      voiceCount,
      likedByUser,
    };
  });
};

export const getScriptProcess = (data: ScriptResponseData): ScriptType => {
  return {
    id: data._id,
    ...data,
  };
};

export const getScriptBaseProcess = (data: ScriptResponseData[]): ScriptBaseType[] => {
  return data.map((d: ScriptResponseData) => {
    return {
      id: d._id,
      title: d.title,
      tags: d.tags,
    };
  });
};
