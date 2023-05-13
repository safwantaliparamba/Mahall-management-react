import React, { useState } from 'react'
import styled from 'styled-components'
import searchIcon from '../../../assets/icons/Search.png'
import Dots from '../../../assets/icons/Dots'
import AddCustomers from '../../../assets/icons/AddCustomers'
import Delete from '../../../assets/icons/Delete'
import CloseInput from '../../../assets/icons/CloseInput'


const ItemHeader = ({ header, searchHandler, deleteMethod, disableDelete, addNewHandler }) => {
	const [hoverAddNew, setHoverAddNew] = useState(false)
	const [showCloseBtn, setCloseBtn] = useState(false)
	const [searchKeyword, setSearchKeyWord] = useState("")


	function onSearchChange(e) {
		let value = e.target.value
		if (value === "") {
			setCloseBtn(false)
		} else {
			setCloseBtn(true)
		}
		document.addEventListener("keydown",(e)=>{
			if(e.code === "Enter"){
				searchHandler(searchKeyword)
			}
		})
		setSearchKeyWord(value)
	}

	return (
		<>
			<MainWrapper>
				<Header>
					<h1>{header}</h1>
				</Header>
				<TopMenu>
					<TopLeft>
						<SearchBarContainer>
							<input
								type="text"
								placeholder="Search...."
								value={searchKeyword}
								onChange={onSearchChange}
							/>
							{showCloseBtn && (
								<ClearButtonWrapper
									onClick={e => {
										setSearchKeyWord("")
										searchHandler('')
										setCloseBtn(false)
									}}
								>
									<CloseInput />
								</ClearButtonWrapper>
							)}
							<img
								onClick={e => searchHandler(searchKeyword)}
								src={searchIcon}
								alt=""
							/>
						</SearchBarContainer>
					</TopLeft>
					<TopRight>
						<Button
							tabIndex="-1"
							className={hoverAddNew ? "active" : ""}
							onMouseOver={e => setHoverAddNew(true)}
							onMouseLeave={e => setHoverAddNew(false)}
							onClick={e => addNewHandler()}
						>
							<AddCustomers />
							<span>Create</span>
						</Button>
						{/* <Button
							className={[disableDelete ? "disabled" : "deleteActive"]}
							onClick={e => {
								!disableDelete && deleteMethod()
							}}
						>
							<Delete />
							<span>Delete</span>
						</Button> */}
						<Dots />
					</TopRight>
				</TopMenu>
			</MainWrapper>
		</>
	)
}

export default ItemHeader


const ClearButtonWrapper = styled.div`
	cursor: pointer;
	margin: 0 8px;
	display: flex;
	align-items: center;
	svg{
		width:20px;
		fill: #fff;
	}
`

const MainWrapper = styled.section`
	/* background-color: rgb(22 22 25); */
	background: rgb(27 28 31);
	border: 1px solid rgb(38,39,42);

	*{
		user-select: none;
	}
`
const Header = styled.div`
	padding: 36px;
	padding-bottom: 18px;
	h1{
		color: #fff;
		font-size: 24px;
	}
`

const TopMenu = styled.header`
	padding: 24px 38px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Content = styled.main``

const TopLeft = styled.div`
	width: 25%;

`
const TopRight = styled.div`
	display: flex;
	align-items: center;
	
	&>svg{
		cursor: pointer;
		fill: #fff;
		/* width: 19px; */
	}
`
const SearchBarContainer = styled.div`
	border: 1px solid #313236;
	width: 100%;
	padding: 10px 14px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	input{
		flex: 1;
		color: #fff;
	}
	img{
		width: 22px;
		margin-left: 12px;
		cursor: pointer;
	}
`
const Button = styled.button`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 9px 18px;
	color: #9d9999;
	border: 1px solid #313236;
	border-radius: 8px;
	margin-right: 24px;

	svg{
		width: 16px;
	}

	&.disabled{
		cursor: not-allowed;
		*{
			cursor: not-allowed;
		}
	}

	&.deleteActive{
		background-color: #9f0000;
		color: #fff;

		svg{
			fill: #fff;
		}
	}
	&.active{
		background-color: #4b1989;
		color: #fff;

		svg{
			fill: #fff;
		}
	}

	svg{
		fill:#9d9999 ;
	}

	span{
		display: inline-block;
		margin-left: 8px;
	}
`