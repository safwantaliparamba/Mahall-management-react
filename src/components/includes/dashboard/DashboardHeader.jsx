import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../store/authSlice'

const DashboardHeader = () => {
	const [isOpen, setIsOpen] = useState(false)
	const username = useSelector(state => state.auth.username)


	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<MainContainer>
				<header>
					<Link to="/dashboard/dashboard/">
						<h1>DASHBOARD</h1>
					</Link>
					<Right onClick={e => setIsOpen(!isOpen)}>
						<Account>
							{username[0].toUpperCase()}
						</Account>
						<span>{username}</span>
					</Right>
				</header>
			</MainContainer>
			{isOpen && (
				<AccountsModal />
			)}
		</>
	)
}

export default DashboardHeader

const MainContainer = styled.section`
	background-color: rgb(22 22 25);
	
	/* min-height: 100vh; */
	padding: 12px;

	header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 32px;
		background-color:rgb(27 28 31);
		/* background:linear-gradient(#111,#2f0e58,48g); */
		/* background: rgb(2,0,36); */
		/* background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(60,9,94,1) 100%); */

		h1{
			color: #fff;
		}
	}
`
const Account = styled.span`
	margin: 0 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 38px;
	height: 38px;
	border-radius: 50%;
	border: 1px solid rgba(255, 255, 255);
	color: #fff;
`

const Right = styled.div`
	border-left: 2px solid rgb(38, 39, 42);
	display: flex;
	align-items: center;
	cursor: pointer;

	span{
		color: #fff;
	}
`

const AccountsModal = () => {
	const dispatch = useDispatch()
	// useEffect(() => {
	// 	const listener = document.body.addEventListener('click', () => {
	// 		closeHandler()
	// 	})

	// 	return () => {}
	// })
	return (
		<Content>
			<ul>
				<li>
					<Link to=''>Profile</Link>
				</li>
				<li onClick={e => {
					dispatch(authActions.logout())
				}}>
					<img src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/yiaai/01-02-2022/icons/logout.svg" alt="" />
					<span>Logout</span>
				</li>
			</ul>
		</Content>
	)
}

const Content = styled.div`
	position: absolute;
    width: 150px;
    right: 11px;
    top: 88px;
    background: rgb(27, 28, 31);
    border: 1px solid rgb(38, 39, 42);
    font-size: 13px;
    color: rgb(255, 255, 255);
    border-radius: 5px;
    -webkit-box-pack: center;
    justify-content: center;
	
	ul>li{
		padding: 9px 12px ;
		cursor: pointer;

		:last-child{
			border-top: 1px solid rgb(38, 39, 42) ;
			margin-bottom: 0;
			display: flex;
			align-items: center;
			color: #ff2b2b;
		}

		img{
			width: 16px;
			margin-right: 8px;
		}
		a{
			color: #fff;
		}
	}
`