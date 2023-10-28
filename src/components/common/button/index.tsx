"use client";
import React from "react";
import styled, { CSSProperties, DefaultTheme, css } from "styled-components";
// import { Link } from "react-router-dom";

/**
 * 가장 기본이 되는 버튼, PrimaryButton
 */
// export const Button = styled.button<{ border?: number }>`
//     border: none;
//     border-radius: ${(props) => props.border || "0.125"}rem;
//     padding: 0.5rem 1rem;
//     color: white;
//     background: ${({ theme }) => theme.colors.primary};
//     font-size: 1rem;
//     cursor: pointer;
//     outline: none;
// `;
// /**
//  * 보조 버튼
//  */
// export const SecondaryButton = styled(Button)`
//     background: ${({ theme }) => theme.colors.secondary};
// `;
// /**
//  * 투명 버튼
//  */
// export const TransparentButton = styled(Button)`
//     background: transparent;
// `;

const VARIANTS = {
    primary: css`
        background: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
    `,
    secondary: css`
        background: ${({ theme }) => theme.colors.secondary};
        border: 1px solid ${({ theme }) => theme.colors.secondary};
    `,
    grey: css`
        background: ${({ theme }) => theme.colors.grey};
        border: 1px solid ${({ theme }) => theme.colors.grey};
    `,
    black: css`
        background: ${({ theme }) => theme.colors.black};
        border: 1px solid ${({ theme }) => theme.colors.black};
    `,
    transparent: css`
        background: transparent;
        color: black;
    `,
};
const VARIANTS_OUTLINE = {
    primary: css`
        background: none;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
    `,
    secondary: css`
        background: none;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.secondary};
    `,
    grey: css`
        background: none;
        border: 1px solid ${({ theme }) => theme.colors.grey};
        color: ${({ theme }) => theme.colors.grey};
    `,
    black: css`
        background: none;
        border: 1px solid ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.black};
    `,
    transparent: css`
        background: transparent;
        border: 1px solid ${({ theme }) => theme.colors.grey};
        color: black;
    `,
};

export type CustomButtonProps = StyledButtonProps & {
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
    variant?: "primary" | "secondary" | "grey" | "black" | "transparent";
    outline?: boolean;
    $withIcon?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};
export const Button = ({
    type = "button",
    variant = "primary",
    $borderRadius,
    width,
    height,
    $margin,
    $padding,
    outline = false,
    $withIcon = false,
    $float,
    $customStyle,
    disabled,
    className,
    onClick,
    children,
}: CustomButtonProps) => {
    const $variantStyle = outline
        ? VARIANTS_OUTLINE[variant]
        : VARIANTS[variant];

    return (
        <StyledButton
            className={className ? `btn ${className}` : 'btn'}
            type={type}
            disabled={disabled}
            $variantStyle={$variantStyle}
            $borderRadius={$borderRadius}
            width={width}
            height={height}
            $margin={$margin}
            $padding={$padding}
            $float={$float}
            $customStyle={$customStyle}
            $withIcon={$withIcon}
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
};

type StyledButtonProps = {
    $borderRadius?: string;
    width?: string;
    height?: string;
    $padding?: string;
    $margin?: string;
    $customStyle?: any;
    $float?: "left" | "right";
};

const StyledButton = styled.button<
    {
        $variantStyle: any;
        $withIcon: boolean;
    } & StyledButtonProps
>`
    border: none;
    border-radius: ${(props) => props.$borderRadius || "0.125rem"};
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    transition: background 0.5s ease;
    &:disabled,
    &[disabled] {
        background: ${({ theme }) => theme.colors.grey};
        border-color: ${({ theme }) => theme.colors.grey};
    }
    ${(props) => props.$variantStyle}
    ${(props) => props.width && `width: ${props.width};`}
    ${(props) => props.height && `height: ${props.height};`}
    ${(props) => props.$padding && `padding: ${props.$padding};`}
    ${(props) => props.$margin && `margin: ${props.$margin};`}
    ${(props) => props.$customStyle}
    ${(props) => props.$float && `float: ${props.$float};`}
    ${(props) => props.$withIcon && `display: inline-flex; align-items: center;`}
    .icon.icon-sm { margin-right: 0.25rem; }
    .icon.icon-md { margin-right: 0.5rem; }
`;
