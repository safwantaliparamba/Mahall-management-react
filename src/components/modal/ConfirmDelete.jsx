import React from 'react'
import styled, { keyframes } from 'styled-components'
import Delete from '../../assets/icons/Delete'


const ConfirmDelete = ({ deleteHandler, count, item, onClose }) => {
    return (
        <Wrapper onClick={onClose}>
            <Content
                onClick={e => e.stopPropagation()}
            >
                <main>
                    <Delete />
                    <h1>Delete <span>{count}</span> {count <= 1 ? `${item}` : `${item}s`} !</h1>
                    <p>Are you sure you want to delete {count} {count <= 1 ? `${item}` : `${item}s`}</p>
                </main>
                <footer>
                    <Button
                        onClick={e => {
                            onClose()
                        }}
                    >
                        Cancel
                    </Button>
                    <ConfirmButton
                        onClick={(e) => {
                            deleteHandler()
                            onClose()
                        }}
                    >
                        Confirm
                    </ConfirmButton>
                </footer>
            </Content>
        </Wrapper>
    )
}

export default ConfirmDelete


const Wrapper = styled.section`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #534e4e34;

    *{
		user-select: none;
	}
`
const fadeIn = keyframes`
    0%{
        scale: .7;
        opacity: 0.8;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`

const Content = styled.div`
    width: 600px;
    /* max-width: 500px; */
    background: #111;
    border-radius: 16px;
    padding: 58px;
    animation:${fadeIn} .2s ease-in-out ;
    main{
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 32px;
        svg{
            fill: red;
            width: 38px;
            margin-bottom: 28px;
        }
        h1{
            font-size: 24px;
            color: #9d9999;
            /* margin-bottom: 16px; */
        }
        p{
            font-size: 18px;
            margin: 24px 0;
        }
    }
    footer{
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const Button = styled.button`
    display: block;
    width: 30%;
    cursor: pointer;
    font-weight: 600;
    border: 1px solid #75728e;
    padding: 14px 18px;
    border-radius: 8px;
    margin-right: 18px;
    font-size: 18px;
    color: #e8e3f9;
`

const ConfirmButton = styled(Button)`
    background-color: red;
    border: none;
    /* color: #000; */
`