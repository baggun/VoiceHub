import styled from "styled-components";

export const NavBarDropdown = styled.div`
  position: absolute;
  width: 10rem;
  top: 2.5rem;
  right: 0px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bg};
  border-radius: 1rem;
  box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -webkit-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  -moz-box-shadow: 0px 0px 25px 5px rgba(50, 50, 50, 0.2);
  z-index: ${({ theme }) => theme.zIndex.modal};
`;
