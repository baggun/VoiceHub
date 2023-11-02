import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 0.5rem;
  outline: none;
`;

export const AuthInput = styled(Input)`
  padding: 1rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem 0rem;
`;
