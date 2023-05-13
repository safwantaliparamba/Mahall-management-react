import React, { useState,ReactNode,ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import Lottie from 'react-lottie'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import buttonAnimation from '../../assets/lottie/buttonLoader.json'
import { authActions } from '../../store/authSlice'
import show  from '../../assets/icons/eye.svg' 
import hide from '../../assets/icons/hide.svg'
import message from '../../assets/icons/message.svg'
import lock from '../../assets/icons/lock.svg' 
import { api } from '../../config/axios'


const Login = () => {
	const [isHide, setIsHide] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [errorMessage, setErrorMessage] = useState<string | boolean>("") 
	const [isValidUsername, setIsValidUsername] = useState<boolean>(false)
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const loginHandler = () => {
		const data = {
			username,
			password
		}

		if (isValidUsername && isValidPassword) {
			setIsLoading(true);
			api
				.post('/users/login/', data)
				.then(response => {
					console.log(response.data);
					let data = response.data;
					if (data.statusCode === 6000) {
						dispatch(
							authActions.login(
								{
									username: data.data.username,
									accessToken: data.data.access,
									refreshToken: data.data.refresh,
									isAuthenticated: true,
								}
							))
						setIsLoading(false);
						navigate('/dashboard/dashboard/')
					}
					if (data.statusCode === 6001) {
						setErrorMessage(data.data.message)
						setIsLoading(false);
					}
				})
				.catch(err => {
					console.log(err);
					setIsLoading(false);
				})
		}
	}

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: buttonAnimation,
	};

	const onUsernameChange = (e) => {
		const tempUsername = e.target.value

		setErrorMessage(false)
		setUsername(tempUsername)
		setIsValidUsername(false)

		if (tempUsername.length >= 4) {
			setIsValidUsername(true)
		}
	}

	const onPasswordChange = (e) => {
		let tempPassword = e.target.value

		setErrorMessage(false)
		setPassword(tempPassword)
		setIsValidPassword(false)

		if (tempPassword.length >= 4) {
			setIsValidPassword(true)
		}
	}

	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			<MainWrapper>
				<ContentWrapper>
					<Content>
						<H1>Admin Login</H1>
						<P>Pulimparamba Mahall Committee Management System</P>
						<InputContainer>
							<label htmlFor="username">
								<img src={message.toString()} alt="" />
							</label>
							<input
								type="text"
								id='username'
								value={username}
								placeholder="username"
								onChange={onUsernameChange}
							/>
						</InputContainer>
						<InputContainer
							style={{ marginBottom: '8px' }}
						>
							<label htmlFor="password">
								<img
									src={lock.toString()}
									alt=""
								/>
							</label>
							<input
								type={isHide ? "password" : "text"}
								id='password'
								placeholder="password"
								value={password}
								onChange={onPasswordChange}
							/>
							<span>
								<img src={isHide ? hide.toString() : show.toString()} alt="show-hide" onClick={e => setIsHide(!isHide)} />
							</span>
						</InputContainer>
						{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
						<Button
							className={(isValidUsername && isValidPassword) ? "" : "invalid"}
							onClick={loginHandler}>
							{isLoading ? (
								<Lottie
									options={defaultOptions}
									height={200}
									width={200}
								/>
							)
								:
								"Login"
							}
						</Button>
					</Content>
				</ContentWrapper>
			</MainWrapper>
		</>
	)
}

export default Login

const MainWrapper = styled.section`
	background-color: rgb(22 22 25);
	min-height: 100vh;
`
const ContentWrapper = styled.div`
	background-color: rgb(27 28 31);
	width: 40%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Content = styled.div`
	width: 85%;
	height: 50vh;
	color: #fff;
`
const H1 = styled.h1`
	color: #fff;
	font-size: 26px;
	text-align: center;
	margin-bottom: 16px;
`

const InputContainer = styled.div`
	padding: 14px;
	margin-bottom: 24px;
	border: 1px solid rgb(47, 51, 55);
	border-radius: 10px;
	display: flex;
	align-items: center;

	:focus-within{
		border-color: #4b1989;
	}

	label{
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-right: 14px;

		img{
			max-width: 23px;
			max-height: 23px;
			display: block;
			margin-right: 10px;
		}
	}
	input{
		flex: 1;
		color: #fff;
		font-size: 18px;
	}
	span{
		max-width: 25px;
		max-height: 25px;
		display: block;
		cursor: pointer;

		img{
			    width: 100%;
    			display: block;
		}
	}
`

const Button = styled.button`
	cursor: pointer;
	height: 58px;
	width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin-top: 50px;
    padding: 10px 50px;
    /* background: linear-gradient(272deg, rgb(34, 193, 195) 0%, rgb(99, 187, 76) 0%, rgb(24, 152, 175) 100%); */
	background-color: #4b1989;
    border-radius: 10px;
    opacity: 1;
    letter-spacing: 0px;
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-family: gordita_medium;
    text-align: center;

	&.invalid{
		cursor: not-allowed;
	}
`
const P = styled.p`
	color: #fff;
	margin-bottom: 42px;
	text-align: center;
`
const ErrorMessage = styled.p`
	color: red;
`