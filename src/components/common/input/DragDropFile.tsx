import React from "react";
import styled from "styled-components";
import { checkFileFormat } from "@utils/format";
import { IconDragDrop } from "@tabler/icons-react";

type DragDropFileProps = {
    onUpload: (files: FileList) => void;
    count: number;
    formats: string[];
    value?: FileList;
};

const DragDropFile = ({
    onUpload,
    count,
    formats,
    value,
}: DragDropFileProps) => {
    const inputRef = React.useRef<any>(null);
    const [dragging, setDragging] = React.useState(false);
    const [validationState, setValidationState] = React.useState("");

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(false);

        uploadFile(e.dataTransfer.files);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if (fileList) uploadFile(fileList);
    };

    const uploadFile = (fileList: FileList) => {
        const files = Array.from(fileList);

        if (count < files.length) {
            setValidationState(`파일 개수가 올바르지 않습니다.`);
            return;
        }

        if (files.some((file) => checkFileFormat(file.name, formats))) {
            setValidationState(`지원하지 않는 포맷입니다.`);
            return;
        }

        if (files && files.length) {
            setValidationState("");
            console.log(fileList);
            onUpload(fileList);
        }
    };

    return (
        <DragDropFileInput
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            <DropZone
                className={
                    dragging
                        ? "dragging"
                        : validationState !== ""
                        ? "uncorrect"
                        : ""
                }
                onClick={() => {
                    inputRef.current.click();
                }}
            >
                {value && validationState === "" ? (
                    Array.from(value)
                        .map((f) => f.name)
                        .join(", ")
                ) : (
                    <>
                        <IconDragDrop className="icon" />
                        {!dragging && validationState !== ""
                            ? validationState
                            : "첨부할 파일을 끌어서 추가하거나 클릭할 수 있습니다."}
                    </>
                )}
            </DropZone>
            <input
                className="d-none"
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={true}
                onChange={handleFileSelect}
                accept={`.${formats.join(", .")}`}
            />
        </DragDropFileInput>
    );
};

export default DragDropFile;

const DragDropFileInput = styled.div`
    position: relative;
    cursor: pointer;
`;

const DropZone = styled.div`
    display: flex;
    width: 100%;
    height: 25rem;
    padding: 2rem;
    font-weight: 300;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.grey};
    border: 2px ${({ theme }) => theme.colors.grey} dashed;
    border-radius: 1rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    &.dragging {
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.lightPrimary};
    }
    &.uncorrect {
        color: ${({ theme }) => theme.colors.warning};
        border-color: ${({ theme }) => theme.colors.warning};
    }
    .icon {
        width: 80px;
        height: 80px;
        pointer-events: none;
    }
`;
