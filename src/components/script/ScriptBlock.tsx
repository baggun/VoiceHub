"use client";

import styled, { css } from "styled-components";

type ScriptBlockProps = {
  children?: React.ReactNode;
  height?: string;
  disabled?: boolean;
};

const ScriptBlock = ({
  children,
  height,
  disabled = false,
}: ScriptBlockProps) => {
  return (
    <ScriptBlockStyled height={height} disabled={disabled}>
      <ScriptContent className="scroll dark">{children}</ScriptContent>
    </ScriptBlockStyled>
  );
};

export default ScriptBlock;

const ScriptBlockStyled = styled.div<ScriptBlockProps>`
  padding: 1rem 0.5rem 1rem 1rem;
  width: 100%;
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
      max-height: ${props.height};
    `}
  background: ${({ theme }) => theme.colors.grey_bg};
  border-radius: 1rem;
  white-space: pre-line;
  color: #e3e3e3;
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${props.theme.colors.grey};
    `}
`;
const ScriptContent = styled.div`
  height: 100%;
  overflow: hidden auto;
`;
