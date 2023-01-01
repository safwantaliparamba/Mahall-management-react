import React, { useEffect, useState } from 'react'
import ItemHeader from '../includes/main/ItemHeader'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Tick from "../../assets/icons/Tick"
import Edit from '../../assets/icons/Edit'
import Dots from '../../assets/icons/Dots'
import View from '../../assets/icons/View'
import useClickOutside from '../hooks/useClickOutside'


const Members = () => {
	const [, setSearchKeyWord] = useState('')
	const [disableDelete, setDisableDelete] = useState(true)
	const [selectAll, setSelectAll] = useState(false)
	const [selectedCustomers, setSelectedCustomers] = useState([])
	const [toggleActionModal, setToggleActionModal] = useState(false)
	const [activeItem, setActiveItem] = useState({})
	const [employees] = useState([
		{
			id: 1,
			name: 'Safwan p',
			mobile: 7994720767,
			position: "President",
			age: 34,
			member_id: 'MBID01',
			department: "Finance",
		},
		{
			id: 2,
			name: 'Hiyas usman',
			mobile: 9526612248,
			position: "Secretary",
			age: 34,
			member_id: 'MBID02',
			department: "Food",

		},
		{
			id: 3,
			name: 'Safwan p',
			mobile: 7994720767,
			position: "Treasurer",
			age: 34,
			member_id: 'MBID03',
			department: "Commercial",
		},
		{
			id: 4,
			name: 'Hiyas usman',
			mobile: 9526612248,
			position: "J. Secretary",
			age: 34,
			member_id: 'MBID04',
			department: "Legal",

		},
		{
			id: 5,
			name: 'Safwan p',
			mobile: 7994720767,
			position: "Treasurer",
			age: 34,
			member_id: 'MBID05',
			department: "Food",
		},
		{
			id: 6,
			name: 'Hiyas usman',
			mobile: 9526612248,
			position: "Member",
			age: 34,
			member_id: 'MBID06',
			department: "Food",

		},
		{
			id: 7,
			name: 'Safwan p',
			mobile: 7994720767,
			position: "Member",
			age: 34,
			member_id: 'MBID07',
			department: "Food",
		},
	])

	const bulkDeleteHandler = () => {
		console.log("bulk delete button triggered");
	}

	const addNewHandler = () => {
		console.log("Add new button triggered");
	}

	useEffect(() => {
		if (selectedCustomers.length === 0) {
			setDisableDelete(true)
		} else {
			setDisableDelete(false)
		}
	}, [selectedCustomers])

	const selectAllHandler = () => {
		if (selectedCustomers.length !== employees.length) {
			setSelectedCustomers(employees)
			setSelectAll(true)
		} else {
			setSelectedCustomers([])
			setSelectAll(false)
		}
	}

	const singleSelectHandler = (customer) => {

		let isIncluded = selectedCustomers.find(item => item.id === customer.id)
		if (!isIncluded) {
			setSelectedCustomers(prev => [...prev, customer])
		} else {
			let filteredItems = selectedCustomers.filter(item => item.id !== customer.id)
			setSelectedCustomers(filteredItems)
		}

	}

	const handler = () => {
		setToggleActionModal(false)
	}

	return (
		<>
			<Helmet>
				<title>Members</title>
			</Helmet>
			<ItemHeader
				header="Members"
				setSearchKeyWord={setSearchKeyWord}
				addNewHandler={addNewHandler}
				deleteMethod={bulkDeleteHandler}
				disableDelete={disableDelete}
			/>
			<HeadContainer>
				<SelectAll onClick={e => selectAllHandler()}>
					{selectAll && <Tick />}
				</SelectAll>
				<Head>
					<li className="sl-no">No</li>
					<li>Name</li>
					<li className='mobile'>Mobile</li>
					<li>Position</li>
					<li>Department</li>
					<li className='age'>Age</li>
					<li className=''>Member Id</li>
					<li>Actions</li>
				</Head>
			</HeadContainer>
			{employees.map((customer, index) => (
				<ItemWrapper key={customer.id}>
					<SelectItem
						onClick={e => singleSelectHandler(customer)}
					>
						{selectedCustomers.find(item => item.id === customer.id) && <Tick />}
					</SelectItem>
					<Items>
						<li className="sl-no">{customer.id}</li>
						<li>{customer.name}</li>
						<li className='mobile'>{customer.mobile}</li>
						{/* <li className='address'>{customer.address.slice(0, 20)}{customer.address.length >= 25 && "..."}</li> */}
						<li className=''>{customer.position}</li>
						<li className=''>{customer.department}</li>
						<li className='age'>{customer.age}</li>
						<li className=''>{customer.member_id}</li>
						<ActionContainer>
							<EditButton>
								<Edit />
								<span>edit</span>
							</EditButton>
							<ViewIcon>
								<View />
								<span>view</span>
							</ViewIcon>
							<span
								id={`dots-${index}`}
								onClick={e => {
									setToggleActionModal(!toggleActionModal)
									setActiveItem(customer)
								}}>
								<Dots />
							</span>
							{toggleActionModal && activeItem.id === customer.id && (
								<MenuItemModal
									item={toggleActionModal}
									handler={handler}
									index={index}
								// setToggleActionModal={setToggleActionModal}
								/>
							)}
						</ActionContainer>
					</Items>
				</ItemWrapper>
			))}
		</>
	)
}


const MenuItemModal = ({ handler, item, index }) => {
	const parentRef = document.getElementById(`dots-${index}`)
	const modalRef = useClickOutside(handler,parentRef)

	return (
		<MenuItems ref={modalRef}>
			<ul>
				<li>
					<span>
						<View />
						<span>View</span>
					</span>
				</li>
				<li>
					<span>
						<Edit />
						<span>Edit</span>
					</span>
				</li>
				<li>
					<span>
						<Dots />
						<span>Option</span>
					</span>
				</li>
			</ul>
		</MenuItems>
	)
}


export default Members


const HeadContainer = styled.div`
	margin: 24px 0;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
`

const Head = styled.ul`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 4px;
	justify-content: space-between;
	
	*{
		color: #fff;
	}
	
	li{
		background: #4b1989;
		padding: 12px 24px;
		flex: 1;
		border: 1px solid rgb(27 28 31);

		&.age{
			width: 90px;
			flex: none;
		}
		&.sl-no{
			width: 70px;
			flex: none;
		}
		&.house-no{
		width: 140px;
		flex: none;
		}
		&.mobile{
		flex:none;
		width:170px;
		}
		&.salary{
			flex:none;
			width:130px;
		}
		&.actions{
			flex:none;
			width:150px;
		}
	}
`


const SelectAll = styled.div`
	display: inline-block;
	width: 25px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #4b1989;
	border-radius: 5px;
	margin-right: 12px;
	cursor: pointer;
	svg{
		fill: #fff;
	}
`

const ItemWrapper = styled.div`
	display: flex;
	margin-bottom: 4px;
	`
const Items = styled.ul`
	display: flex;
	/* align-items: center; */
	gap: 4px;
	width: 100%;
	justify-content: space-between;
	
	li{
		background: rgb(27 28 31);
		flex: 1;
		padding: 12px 24px;
		border: 1px solid rgb(38,39,42);
		color: #9d9999;
		 

		&.age{
			width: 90px;
			flex: none;
		}
		&.sl-no{
			width: 70px;
			flex: none;
		}
		&.house-no{
		width: 140px;
		flex: none;
		}
		&.mobile{
		flex:none;
		width:170px;
		}
		&.salary{
			flex:none;
			width:130px;
		}
		&.actions{
			flex:none;
			width:150px;
		}
	}
`
const SelectItem = styled.div`
	display: inline-block;
	width: 25px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #4b1989;
	border-radius: 5px;
	margin-right: 12px;
	cursor: pointer;
	svg{
		fill: #fff;
	}
`
const EditButton = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 6px;
	color: #00d393;
	svg{
		fill: #00d393;
	}
`
// const DeleteButton = styled(EditButton)`
// 	color: #9f0000;
// 	svg{
// 		fill: #9f0000;
// 	}
// `
const ViewIcon = styled(EditButton)`
	color: #9d9d9d;
	svg{
		fill: #9d9d9d;
	}
`
const ActionContainer = styled.li`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	span{
		cursor: pointer;
	}
`

// action modal styles  

const MenuItems = styled.div`
	position:absolute;
	right:38px;
	top:42px;
	z-index:1000;
	
	ul{
		background:none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: .6px;
		width: 200px;
		border-radius: 8px;
		border-top-right-radius: 0%;
		overflow: hidden;
		border:1px solid rgb(157, 153, 153);
		
		
		li{
			border:none;
			background:none;
			padding: 0;
			margin: 0;
			:first-child{
				&>span{
					/* border-top-left-radius: 12px; */
					/* border-top-right-radius: 12px; */
				}
			}
			:last-child{
				&>span{
					/* border-bottom-left-radius: 12px;
					border-bottom-right-radius: 12px; */
				}
			}
			&>span{
				/* background-color:#190926; */
				background-color:#211e24;
				width: 100%;
				display: flex;
				align-items: center;
				color:#fff;
				font-size: 14px;
				padding: 12px 28px;
				transition: all 0.7s ease-in-out;

				svg{
					width: 16px;
					/* fill:#7c7997; */
					fill:#fff;
					margin-right: 10px;
				}
				
				:hover{
					background-color:#4b1989;
					color: #fff;
				}
			}
		}
	}
`