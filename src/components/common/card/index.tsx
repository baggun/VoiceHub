import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  position: relative;
  padding: 3rem;
  border-radius: 1rem;
  background-color: white;
  flex-direction: column;
  box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
  -webkit-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
  -moz-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.05);
`;

export const AuthCard = styled(Card)`
  text-align: center;
  gap: 1rem;
  .lead-msg {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const UploadCard = styled(Card)`
  margin-top: 3rem;
  ${({ theme }) => theme.devices.max_tablet} {
    padding: 2rem;
    margin-top: 1rem;
  }
`;
