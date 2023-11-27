import React from "react";
import { RecoilRoot } from "recoil";

export const RecoilProvider = (Story: React.ComponentType) => (
  <RecoilRoot>
    <Story />
  </RecoilRoot>
);

export default RecoilProvider;
