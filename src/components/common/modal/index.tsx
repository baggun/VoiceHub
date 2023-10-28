import styled from "styled-components";

export const StyledModalBackground = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: none;
    z-index: ${({ theme }) => theme.zIndex.modalBG};
`;

export const ModalBackground = ({ onClick } : { onClick : React.Dispatch<React.SetStateAction<boolean>>}) => {
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onClick(false);
    }
    return <StyledModalBackground onClick={onClickHandler}></StyledModalBackground>
};