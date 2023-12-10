"use client";

import { TagStyled } from "./index.styled";
import { useSetRecoilState } from "recoil";
import { searchModalState, searchState } from "@recoil/search/atom";

export type TagProps = {
  tag: string;
  $darkmode?: boolean;
};

const Tag = ({ tag, $darkmode = false }: TagProps) => {
  const setSearchTxt = useSetRecoilState(searchState);
  const setSearchModal = useSetRecoilState(searchModalState);

  const searchTag = () => {
    setSearchTxt(tag);
    setSearchModal(true);
  };

  return (
    <TagStyled onClick={searchTag} className="tag" $darkmode={$darkmode}>
      #{tag}
    </TagStyled>
  );
};
export default Tag;
