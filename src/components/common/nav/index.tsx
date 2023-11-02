import Link from "next/link";
import styled, { CSSProperties, css } from "styled-components";

export const Nav = styled.ul<{
  $direction?: "column" | "row";
  $alignItems?: "normal" | "center" | "start" | "stretch";
}>`
  display: flex;
  list-style: none;
  flex-direction: ${props => props.$direction || "row"};
  align-items: ${props => props.$alignItems || "normal"};
`;

export const NavItem = ({
  to,
  className,
  childClassName,
  children,
  onClick,
}: {
  to?: string;
  className?: string;
  childClassName?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <NavItemStyled className={className}>
      {to ? (
        <NavItemLink href={to} className={childClassName}>
          {children}
        </NavItemLink>
      ) : (
        <NavItemButton onClick={onClick} className={childClassName}>
          {children}
        </NavItemButton>
      )}
    </NavItemStyled>
  );
};

export const NavItemActive = ({
  className,
  childClassName,
  $isActive,
  children,
  onClick,
}: {
  className?: string;
  childClassName?: string;
  $isActive?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <NavItemStyled className={className} $margin="0rem 0.5rem 0rem 0rem">
      <NavItemActiveButton onClick={onClick} className={childClassName} $isActive={$isActive}>
        {children}
      </NavItemActiveButton>
    </NavItemStyled>
  );
};

export const NavItemDivider = styled.hr`
  margin: 0.25rem 0rem;
  background: ${({ theme }) => theme.colors.lightGrey};
  height: 1px;
  border: 0;
`;

const NavItemStyled = styled.li<{ $margin?: string }>`
  margin: ${props => props.$margin || "0px"};
`;

const NavItemLink = styled(Link)`
  padding: 0.25rem;
  display: block;
  font-size: 0.875rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const NavItemButton = styled.button`
  padding: 0.25rem;
  display: block;
  font-size: 0.875rem;
  border: none;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: ${({ theme }) => theme.colors.minute_bg};
  }
`;

const NavItemActiveButton = styled(NavItemButton)<{ $isActive?: boolean }>`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background: none;
  border-radius: 1rem;
  ${props => {
    return props.$isActive
      ? css`
          font-weight: bold;
          color: ${({ theme }) => theme.colors.primary};
        `
      : css`
          font-weight: 300;
          color: grey;
        `;
  }}
  .icon {
    margin-right: 0.25rem;
    width: 1rem;
    height: 1rem;
    opacity: 1;
  }
`;
