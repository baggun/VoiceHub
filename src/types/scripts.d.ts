export type ScriptBaseType = {
    id: string | number;
    title: string;
    tags: string[];
};

export type ScriptType = ScriptBaseType & {
    script: string;
    voiceCount: number;
    likeCount: number;
    likedByUser?: boolean;
};
