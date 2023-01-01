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
import ConfirmDelete from '../modal/ConfirmDelete'


const Customers = () => {
	const [, setSearchKeyWord] = useState('')
	const [disableDelete, setDisableDelete] = useState(true)
	const [showDeleteModal, setDeleteModal] = useState(false)
	const [, setSelectAll] = useState(false)
	const [selectedCustomers, setSelectedCustomers] = useState([])
	const [toggleActionModal, setToggleActionModal] = useState(false)
	const [activeItem, setActiveItem] = useState({})
	const [addNew, setAddNew] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [customers, setCustomers] = useState([
		{
			id: 1,
			name: 'Safwan p',
			age: 20,
			mobile_number: 7994720767,
			address: "Parottakath house pulimparamba Taliparamba",
			job: "Software engineer",
			blood_group: "",
			image: "",
		},
		{
			id: 2,
			name: 'Hiyas usman',
			age: 19,
			mobile_number: 9526612248,
			address: "house pulimparamba Taliparamba",
			job: "CA",
			blood_group: "",
			image: "",
		},
		{
			id: 3,
			name: 'Safwan p',
			age: 20,
			mobile_number: 7994720767,
			address: "Parottakath house pulimparamba Taliparamba",
			job: "Software engineer",
			blood_group: "",
			image: "",
		},
		{
			id: 4,
			name: 'Hiyas usman',
			age: 19,
			mobile_number: 9526612248,
			address: "house pulimparamba Taliparamba",
			job: "CA",
			blood_group: "",
			image: "",
		},
		{
			id: 5,
			name: 'Safwan p',
			age: 20,
			mobile_number: 7994720767,
			address: "Parottakath house pulimparamba Taliparamba",
			job: "Software engineer",
			blood_group: "",
			image: "",
		},
		{
			id: 6,
			name: 'Hiyas usman',
			age: 19,
			mobile_number: 9526612248,
			address: "house pulimparamba Taliparamba",
			job: "CA",
			blood_group: "",
			image: "",
		},
		{
			id: 7,
			name: 'Safwan p',
			age: 20,
			mobile_number: 7994720767,
			address: "Parottakath house pulimparamba Taliparamba",
			job: "Software engineer",
			blood_group: "",
			image: "",
		},
	])
	const addNewInitialState = {
		name: '',
		age: '',
		mobile_number: '',
		address: '',
		job: '',
		blood_group: '',
		image: '',
	}

	const addNewFields = [
		{
			name: "name",
			type: "text",
			placeHolder: "Name",
		},
		{
			name: "age",
			type: "number",
			placeHolder: "Age",
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
		{
			name: "job",
			type: "text",
			placeHolder: "Job",
		},
		{
			name: "blood_group",
			type: "text",
			placeHolder: "Blood group",
		},
		{
			name: "image",
			type: "file",
			placeHolder: "Image",
		},
	]

	const deleteHandler = () => {
		let filteredCustomers = customers
		selectedCustomers.forEach(customer => {
			filteredCustomers = filteredCustomers.filter(cust => cust.id !== customer.id)
		})
		setCustomers(filteredCustomers)
		setDisableDelete(true)
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
		if (selectedCustomers !== customers) {
			setSelectedCustomers(customers)
			setSelectAll(true)
		} else {
			setSelectedCustomers([])
			setSelectAll(false)
			setDisableDelete(true)
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

	const addItem = (customer) => {
		setCustomers([...customers, { id: customers[customers.length - 1].id + 1, ...customer }])
	}
	const editItem = (customer) => {
		let index = customers.findIndex(item => item.id === customer.id)
		
		if(index !== -1) {
			customers[index] = customer
		}
		setCustomers(customers)
	}

	const handler = () => {
		setToggleActionModal(false)
	}

	return (
		<>
			<Helmet>
				<title>Customers</title>
			</Helmet>
			<ItemHeader
				header="Customers"
				setSearchKeyWord={setSearchKeyWord}
				addNewHandler={addNewHandler}
				deleteMethod={() => setDeleteModal(true)}
				disableDelete={disableDelete}
			/>
			<HeadContainer>
				<SelectAll onClick={e => selectAllHandler()}>
					{selectedCustomers === customers ? <Tick /> : null}
				</SelectAll>
				<Head>
					<li className="sl-no">No</li>
					<li>Name</li>
					<li className='age'>Age</li>
					<li>Mobile</li>
					<li>Address</li>
					<li>Job</li>
					<li>Actions</li>
				</Head>
			</HeadContainer>
			{customers.map((customer, index) => (
				<ItemWrapper key={customer.id}>
					<SelectItem
						onClick={e => singleSelectHandler(customer)}
					>
						{selectedCustomers.find(item => item.id === customer.id) && <Tick />}
					</SelectItem>
					<Items>
						<li className="sl-no">{customer.id}</li>
						<li>{customer.name}</li>
						<li className='age'>{customer.age}</li>
						<li>{customer.mobile_number}</li>
						<li className='address'>{customer.address.slice(0, 20)}{customer.address.length >= 15 && "..."}</li>
						<li>{customer.job}</li>
						<ActionContainer>
							<EditButton onClick={e => {
								setActiveItem(customer)
								setEditModal(true)
							}}>
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
								}}
							>
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
			{addNew && (
				<AddNew
					onClose={() => setAddNew(false)}
					initialState={addNewInitialState}
					fields={addNewFields}
					header="Create Customer"
					addItem={addItem}
				/>
			)}
			{editModal && (
				<AddNew
					onClose={() => setEditModal(false)}
					initialState={activeItem}
					fields={addNewFields}
					header="Edit Customer"
					addItem={editItem}
				/>
			)}
			{showDeleteModal &&
				<ConfirmDelete
					deleteHandler={deleteHandler}
					count={selectedCustomers.length}
					item="customer"
					onClose={() => {
						setDeleteModal(false)
						setDisableDelete(true)
						setSelectedCustomers([])
					}}
				/>
			}
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


export default Customers



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
		&.address{

			/* display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden; */
			/* line-height: 39px; */
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

// menu item styles


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