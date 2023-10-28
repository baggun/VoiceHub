export type TabType = {
    tab: string;
    title: string;
};

export type TabObjType = {
    [key: string]: TabType & { api: (string) => Promise<void> };
};
