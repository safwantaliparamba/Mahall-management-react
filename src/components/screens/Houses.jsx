import React, { useEffect, useState } from 'react'
import ItemHeader from '../includes/main/ItemHeader'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Tick from "../../assets/icons/Tick"
import Edit from '../../assets/icons/Edit'
import Dots from '../../assets/icons/Dots'
import View from '../../assets/icons/View'
import useClickOutside from '../hooks/useClickOutside'
import AddNew from '../modal/AddNew'


const Houses = () => {
	const [, setSearchKeyWord] = useState('')
	const [disableDelete, setDisableDelete] = useState(true)
	const [selectAll, setSelectAll] = useState(false)
	const [selectedCustomers, setSelectedCustomers] = useState([])
	const [toggleActionModal, setToggleActionModal] = useState(false)
	const [activeItem, setActiveItem] = useState({})
	const [addNew, setAddNew] = useState(false)
	const [Houses] = useState([
		{
			id: 1,
			name: 'Safwan p',
			mobile: 7994720767,
			house_number: 1,
			address: "Parottakath house pulimparamba Taliparamba",
		},
		{
			id: 2,
			name: 'Hiyas usman',
			mobile: 9526612248,
			house_number: 2,
			address: "house pulimparamba Taliparamba",
		},
		{
			id: 3,
			name: 'Safwan p',
			mobile: 7994720767,
			house_number: 3,
			address: "Parottakath house pulimparamba Taliparamba",
		},
		{
			id: 4,
			name: 'Hiyas usman',
			mobile: 9526612248,
			house_number: 4,
			address: "house pulimparamba Taliparamba",
		},
		{
			id: 5,
			name: 'Safwan p',
			mobile: 7994720767,
			house_number: 5,
			address: "Parottakath house pulimparamba Taliparamba",
		},
		{
			id: 6,
			name: 'Hiyas usman',
			mobile: 9526612248,
			house_number: 6,
			address: "house pulimparamba Taliparamba",
		},
		{
			id: 7,
			name: 'Safwan p',
			mobile: 7994720767,
			house_number: 7,
			address: "Parottakath house pulimparamba Taliparamba",
		},
	])

	const addNewInitialState = {
		house_number: Houses.length + 1,
		name: '',
		mobile_number: '',
		address: '',
	}
	const addNewFields = [
		{
			name: "house_number",
			type: "number",
			placeHolder: "Name",
			disabled:true
		},
		{
			name: "name",
			type: "text",
			placeHolder: "Name",
		},
		{
			name: "mobile_number",
			type: "number",
			placeHolder: "Mobile Number",
		},
		{
			name: "address",
			type: "text",
			placeHolder: "House name",
		},
	]

	const bulkDeleteHandler = () => {
		console.log("bulk delete button triggered");
	}

	const addNewHandler = () => {
		setAddNew(true)
	}

	useEffect(() => {
		if (selectedCustomers.length === 0) {
			setDisableDelete(true)
		} else {
			setDisableDelete(false)
		}
	}, [selectedCustomers])

	const selectAllHandler = () => {
		if (selectedCustomers.length !== Houses.length) {
			setSelectedCustomers(Houses)
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
				<title>Houses</title>
			</Helmet>
			<ItemHeader
				header="Houses"
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
					<li className="house-no">House No</li>
					<li>Name</li>
					<li>Address</li>
					<li className='mobile'>Mobile</li>
					{/* <li>Address</li>
          <li>Job</li> */}
					<li className='actions'>Actions</li>
				</Head>
			</HeadContainer>
			{Houses.map((customer, index) => (
				<ItemWrapper key={customer.id}>
					<SelectItem
						onClick={e => singleSelectHandler(customer)}
					>
						{selectedCustomers.find(item => item.id === customer.id) && <Tick />}
					</SelectItem>
					<Items>
						<li className="house-no">{customer.id}</li>
						<li>{customer.name}</li>
						<li className='address'>{customer.address.slice(0, 29)}{customer.address.length >= 30 && "..."}</li>
						<li className='mobile'>{customer.mobile}</li>
						<ActionContainer className='actions'>
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
									setActiveItem(customer)
									setToggleActionModal(!toggleActionModal)
								}}>
								<Dots />
							</span>
							{toggleActionModal && activeItem.id === customer.id && (
								<MenuItemModal
									item={toggleActionModal}
									handler={handler}
									index={index}
								/>
							)}
						</ActionContainer>
					</Items>
				</ItemWrapper>
			))}
			{addNew && <AddNew
				header="Create House"
				initialState={addNewInitialState}
				fields={addNewFields}
				onClose={() => setAddNew(false)}
			/>}
		</>
	)
}

const MenuItemModal = ({ handler, item, index }) => {
	const parentRef = document.getElementById(`dots-${index}`)
	const modalRef = useClickOutside(handler, parentRef)

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


export default Houses

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
			width: 100px;
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
		&.actions{
			flex:none;
			width:350px;
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
			width: 100px;
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
		&.actions{
			flex:none;
			width:350px;
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
	width:160px;
	flex:none;
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
	border-radius: 10px;
	
	ul{
		background:none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: .6px;
		width: 350px;
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