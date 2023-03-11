import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


const MainDashboard = () => {
	const [top, setTop] = useState(0)
	const [left, setLeft] = useState(0)

	useEffect(() => {

		let modal = document.getElementById("modal")

		const clickEvent = (e) => {
			e.preventDefault();

			if (e.pageX + modal.clientWidth > window.innerWidth) {
				setLeft(e.clientX - modal.clientWidth)
			} else {
				setLeft(e.clientX)
			}

			if (e.pageY + modal.clientHeight > window.innerHeight) {
				setTop(e.clientY - modal.clientHeight)
			} else {
				setTop(e.clientY)
			}
		}

		document.addEventListener("click", clickEvent)

		return () => {
			document.removeEventListener("click", clickEvent)
		}
	}, [top, left])

	return (
		<div >
			<h1>MainDashboard</h1>
			{/* <Dot id="modal" className={top !== 0 ? "active" : ""} top={top} left={left} /> */}
		</div>
	)
}

export default MainDashboard

const Dot = styled.span`
	position: absolute;
	display: none;
	top: ${({ top }) => top ? `${top}px` : `0`};
	left: ${({ left }) => left ? `${left}px` : `0`};
	width: 250px;
	height: 250px;
	background-color: #fff;

	&.active{
		display: block;
	}
`