import Link from "next/link";
import styled from "styled-components";
// import { Link } from "react-router-dom";

import { TagStyled } from "./index.styled";

type TagProps = {
  tag: string;
  $darkmode?: boolean;
};

const Tag = ({ tag, $darkmode = false }: TagProps) => {
  return (
    <TagStyled href="#" className="tag" $darkmode={$darkmode}>
      #{tag}
    </TagStyled>
  );
};
export default Tag;
