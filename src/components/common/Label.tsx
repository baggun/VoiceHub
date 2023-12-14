import React from "react";
import styled, { css } from "styled-components";

interface LabelProps extends React.ComponentProps<"label"> {
  $require?: boolean;
}

const Label = ({ $require = false, ...props }: LabelProps) => {
  return (
    <LabelStyled {...props} $require={$require}>
      {props.children}
    </LabelStyled>
  );
};

export default Label;

const LabelStyled = styled.label<{ $require: boolean }>`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-weight: 500;

  ${(props) =>
    props.$require &&
    css`
      &:after {
        content: "*";
        color: ${props.theme.colors.warning};
        margin-left: 0.25rem;
      }
    `}
`;
