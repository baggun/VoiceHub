"use client";

import styled from "styled-components";

export const ContainerFluid = styled.div`
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
    &.pd-none {
        padding-left: 0px;
        padding-right: 0px;
    }
`;
export const Container = styled(ContainerFluid)`
    margin-left: auto;
    margin-right: auto;
    ${({ theme }) => theme.devices.mobile} {
        // max-width: 544px;
    }
    ${({ theme }) => theme.devices.tablet} {
        // max-width: 736px;
    }
    ${({ theme }) => theme.devices.desktop} {
        max-width: 960px;
    }
    ${({ theme }) => theme.devices.desktopLarge} {
        max-width: 1168px;
    }
`;
export const ContainerDesktop = styled(ContainerFluid)`
    margin-left: auto;
    margin-right: auto;
    ${({ theme }) => theme.devices.max_desktopLarge} {
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
    }
    ${({ theme }) => theme.devices.desktopLarge} {
        max-width: 1168px;
    }
`;
export const MobileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f1f3f7;
    ${({ theme }) => theme.devices.max_only_mobile} {
        background-color: white;
    }
`;
export const MobileContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 32rem;
    margin: 0 auto;
`;