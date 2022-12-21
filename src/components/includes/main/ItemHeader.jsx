import React, { useState } from 'react'
import styled from 'styled-components'
import searchIcon from '../../../assets/icons/Search.png'
import Dots from '../../../assets/icons/Dots'
import AddCustomers from '../../../assets/icons/AddCustomers'
import Delete from '../../../assets/icons/Delete'
// import { useNavigation } from 'react-router-dom'


const ItemHeader = ({ header, setSearchKeyWord, addNewHandler, deleteMethod, disableDelete }) => {
    const [hoverAddNew, setHoverAddNew] = useState(false)
    const [hoverDelete, setHoverDelete] = useState(false)
    // const [disableDelete] = useState(false)

    // const navigate = useNavigation()

    return (
        <>
            <MainWrapper>
                <Header>
                    <h1>{header}</h1>
                </Header>
                <TopMenu>
                    <TopLeft>
                        <SearchBarContainer>
                            <input type="search" placeholder="Search...." onChange={e => setSearchKeyWord(e.target.value)} />
                            <img src={searchIcon} alt="" />
                        </SearchBarContainer>
                    </TopLeft>
                    <TopRight>
                        <Button
                            className={hoverAddNew ? "active" : ""}
                            onMouseOver={e => setHoverAddNew(true)}
                            onMouseLeave={e => setHoverAddNew(false)}
                            onClick={e => addNewHandler()}
                        >
                            <AddCustomers />
                            <span>Add New</span>
                        </Button>
                        <Button
                            className={[disableDelete ? "disabled" : "", hoverDelete ? "deleteActive" : ""]}
                            onMouseOver={e => !disableDelete && setHoverDelete(true)}
                            onMouseLeave={e => !disableDelete && setHoverDelete(false)}
                            onClick={e =>{
                                !disableDelete && deleteMethod()
                            }}
                        >
                            <Delete />
                            <span>Delete</span>
                        </Button>
                        <Dots />
                    </TopRight>
                </TopMenu>
                <Content>

                </Content>
            </MainWrapper>
        </>
    )
}

export default ItemHeader

const MainWrapper = styled.section`
	/* background-color: rgb(22 22 25); */
	background: rgb(27 28 31);
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