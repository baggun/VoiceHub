import styled from "styled-components";
import Textarea from ".";

type ScriptTextareaProps = {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id?: string;
    disabled?: boolean;
};
const ScriptTextarea = ({
    id,
    value,
    onChange,
    disabled = false,
}: ScriptTextareaProps) => {
    return (
        <TextareaStyled
            id={id}
            className="scroll"
            value={value}
            onChange={onChange}
            rows={10}
            placeholder="대사를 입력해주세요.."
            disabled={disabled}
        />
    );
};
export default ScriptTextarea;

const TextareaStyled = styled(Textarea)<{ disabled: boolean }>`
    color: white;
    border: none;
    background: transparent;
    resize: vertical;
    width: 100%;
    ${(props) => props.disabled && `color: ${props.theme.colors.grey};`}
`;
