"use client";

import styled from "styled-components";

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 3rem 0rem;
`;

export const ErrorMsg = styled.p`
    text-align: left;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 0.875rem;
`;

export const FormGroup = styled.div`
    margin-bottom: 2rem;
`;