import React from 'react'
import styled, { keyframes } from 'styled-components'
import NoNetwork from '../../assets/icons/NoNetwork'

const NetworkError = () => {
	return (
		<Wrapper>
			<Content>
				<div className="icon-wrapper">
					<NoNetwork />
				</div>
				<h1>Check your internet connection</h1>
				<div className="actions">
					<Button onClick={e => window.location.reload()}>Retry</Button>
				</div>
			</Content>
		</Wrapper>
	)
}

export default NetworkError

const Wrapper = styled.section`
  	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(27 28 31);

	*{
		user-select: none;
		color: #fff;
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
	/* height: 300px; */
	background: #111;
    border-radius: 16px;
    padding: 42px;
    animation:${fadeIn} .2s ease-in-out ;

	.icon-wrapper{
		margin-bottom: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		svg{
			fill: #9d9999;
		}
	}

	h1{
		text-align: center;
		color: #9d9999;
	}

	.actions{
		display: flex;
		justify-content: flex-end;
	}
`

const Button = styled.button`
	cursor:pointer;
	padding: 12px 42px;
	/* background: #534e4e; */
	background: #4B1989;
	font-size: 17px;
	font-weight: 600;
	border-radius: 10px;
	margin-top: 52px;
`