"use client";

import styled, { css } from "styled-components";

export const ProfileImg = styled.img<{ size?: number }>`
    width: 100%;
    height: 100%;
    ${(props) => {
        if (props.size)
            return css`
                width: ${props.size}rem;
                height: ${props.size}rem;
            `;
    }}
`;
