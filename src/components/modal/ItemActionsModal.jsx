import React from 'react'
import styled from 'styled-components'

const ItemActionsModal = ({ onClose, item }) => {
    return (
        <Overlay onClick={e => onClose()}>
            <Container onClick={e => e.stopPropagation()}>
                <h1>{item.id}</h1>
            </Container>
        </Overlay>
    )
}

export default ItemActionsModal

const Overlay = styled.section`
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top:0 ;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4446;
`

const Container = styled.div`
    width: 350px;
    height: 400px;
    background-color: rgb(38, 39, 42);
    /* border: 2px solid rgb(38,39,42); */
    border: 2px solid #111;
    border-radius: 16px;
    padding: 24px;
    h1{
        color: #9d9999;
    }
`