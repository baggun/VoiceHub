import styled, { CSSProperties } from "styled-components";
import { Button } from ".";

// const SubmitButton = styled(Button).attrs({
//     type: "submit",
// })`
//     width: 100%;
//     border-radius: 0.25rem;
//     padding: 1rem;
//     margin: 1rem 0px;
//     font-weight: bold;
//     background: ${({ theme }) => theme.colors.secondary};
// `;

const SubmitButton = ({
    width = "100%",
    $padding = "1rem",
    margin = "1rem 0rem",
    onClick,
    children,
    disabled,
}: {
    width?: string;
    $padding?: string;
    margin?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    disabled?: boolean;
}) => {
    return (
        <Button
            type="submit"
            variant="secondary"
            width={width}
            $borderRadius="0.25rem"
            disabled={disabled}
            onClick={onClick}
            $padding={$padding}
            $margin={margin}
        >
            {children}
        </Button>
    );
};

export default SubmitButton;
