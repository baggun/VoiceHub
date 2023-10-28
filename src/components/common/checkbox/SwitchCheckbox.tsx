import React from "react";
import styled, { css } from "styled-components";

type SwitchLabelProps = {
    checked: boolean,
    size?: 'sm' | 'md' | 'lg'
}

type SwitchCheckboxProps = SwitchLabelProps & {
    onChange: (t: boolean) => void,
    id: string,
    children?: React.ReactNode,
}

const SwitchCheckbox = ({ checked, onChange, id, children, size = 'md' }: SwitchCheckboxProps) => {
    const onCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    }

    return (
        <SwitchCheckboxStyled>
            <SwitchInput
                type="checkbox"
                id={id}
                className="form-switch-input"
                checked={checked}
                onChange={onCheckedHandler}
            />
            <SwitchLabel
                htmlFor={id}
                className={`form-switch-label size-${size}`}
                checked={checked}
                size={size}
            >
                Switch
            </SwitchLabel>
            {children &&
                <SwitchContent>{children}</SwitchContent>
            }
        </SwitchCheckboxStyled>
    )
};

export default SwitchCheckbox;

const SwitchCheckboxStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const SwitchInput = styled.input`
    display: none;
`;

const SwitchSize = {
    sm: css``,
    md: css`
        width: 4rem;
        height: 2rem;
        &:after {
            top: 0.2rem;
            left: 0.2rem;
            width: 1.6rem;
            height: 1.6rem;
        }
        &:active:after {
            width: 2.4rem;
            left: calc(100% - 0.2rem);
        }`,
    lg: css`
        width: 6rem;
        height: 3rem;
        &:after {
            top: 0.3rem;
            left: 0.3rem;
            width: 2.4rem;
            height: 2.4rem;
        }
        &:active:after {
            width: 3.6rem;
            left: calc(100% - 0.4rem);
        }
    `
}

const SwitchLabel = styled.label<SwitchLabelProps>`
    position: relative;
    display: inline-block;
    border-radius: 50rem;
    width: 2rem;
    height: 1rem;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.lightGrey};
    text-indent: -9999px;
    &:after {
        content: '';
        position: absolute;
        top: 0.1rem;
        left: 0.1rem;
        width: 0.8rem;
        height: 0.8rem;
        background: #fff;
        border-radius: 50rem;
        transition: 0.3s;
    }
    &:active:after { width: 1.2rem; }

	${(props) => props.size && SwitchSize[props.size]}

	${(props) =>
        props.checked && css`
            background: ${props.theme.colors.primary};
            &:after {
                left: calc(100% - 0.1rem);
                transform: translateX(-100%);
            }
            &.size-md:after {
                left: calc(100% - 0.2rem);
            }
            &.size-lg:after {
                left: calc(100% - 0.4rem);
            }
        `
    }
`;

const SwitchContent = styled.div`
    margin-left: 1rem;
`;