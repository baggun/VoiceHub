import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 0.5rem;
  outline: none;
  resize: vertical;
`;

export default Textarea;
