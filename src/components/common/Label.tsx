import React from "react";
import styled, { css } from "styled-components";

type LabelProps = {
  htmlFor?: string;
  children?: React.ReactNode;
  $require?: boolean;
};

const Label = ({ htmlFor, children, $require = false }: LabelProps) => {
  return (
    <LabelStyled htmlFor={htmlFor} $require={$require}>
      {children}
    </LabelStyled>
  );
};

export default Label;

const LabelStyled = styled.label<{ $require: boolean }>`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;

  ${props =>
    props.$require &&
    css`
      &:after {
        content: "*";
        color: ${props.theme.colors.warning};
        margin-left: 0.25rem;
      }
    `}
`;
