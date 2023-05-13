import { createPortal } from "react-dom";
import styled from "styled-components";


const portalElement = document.getElementById("modal")


const ModalWrapper = ({ children, onClose }) => {
    return (
        <Wrapper onClick={onClose}>
            {children}
        </Wrapper>
    )
}

const Modal = ({ children,onClick }) => {
    return (
        <>
            {createPortal(
                <ModalWrapper onClose={onClick}>{children}</ModalWrapper>
                , portalElement)}
        </>
    )
}

export default Modal


const Wrapper = styled.section`
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #534e4e34;
    z-index: 10;
`