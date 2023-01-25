// default react imports 
import React, { useEffect, useState } from 'react'
// 3rd party package imports 
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import ReactPaginate from 'react-paginate';

// local imports 
import ItemHeader from '../includes/main/ItemHeader'
import Tick from "../../assets/icons/Tick"
import Edit from '../../assets/icons/Edit'
import Dots from '../../assets/icons/Dots'
import View from '../../assets/icons/View'
import useClickOutside from '../hooks/useClickOutside'
import AddNew from '../modal/AddNew'
import ConfirmDelete from '../modal/ConfirmDelete'
import useAuthApi from '../hooks/useApi'
import SectionLoader from '../../assets/loaders/SectionLoader'
import { addNewFields, addNewInitialState } from '../data/customers'


const Customers = () => {
	const [disableDelete, setDisableDelete] = useState(true)
	const [showDeleteModal, setDeleteModal] = useState(false)
	const [, setSelectAll] = useState(false)
	const [selectedCustomers, setSelectedCustomers] = useState([])
	const [toggleActionModal, setToggleActionModal] = useState(false)
	const [activeItem, setActiveItem] = useState({})
	const [addNew, setAddNew] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [customers, setCustomers] = useState([])
	const [hasError, setError] = useState(false)

	// pagination states 
	const [currentPage, setCurrentPage] = useState(1)
	const [firstItemCount, setFirstItemCount] = useState(1)

	const queryClient = useQueryClient()

	const api = useAuthApi()

	useEffect(() => {
		if (selectedCustomers.length === 0) {
			setDisableDelete(true)
		} else {
			setDisableDelete(false)
		}
	}, [selectedCustomers])

	const addNewCustomer = async (customer) => {
		return api
			.post('/customers/create/', customer)
			.then(response => {
				const { statusCode, data } = response.data

				if (statusCode === 6000) {
					setAddNew(false)
					return data
				} else {
					return data.message
				}
			})
	}

	const fetchCustomers = async () => {
		return api
			.get(`/customers/?page=${currentPage}`)
			.then(response => {
				const { data, statusCode } = response.data

				if (statusCode === 6000) {
					setError(false)
					setCurrentPage(data.paginated_data.current_page)
					setFirstItemCount(data.paginated_data.first_item)
					return data
				} else {
					setError(true)
					return data
				}
			})
	}

	const { data, isError, isLoading, error, isPreviousData } = useQuery(['customers', currentPage], fetchCustomers, {
		keepPreviousData: true
	})


	const newCustomer = useMutation(['customers'], addNewCustomer, {
		onSuccess: (data, customer, context) => {
			queryClient.invalidateQueries(["customers", currentPage])
			setAddNew(false)
		},
	})

	function deleteHandler() {
		// let filteredCustomers = customers
		// selectedCustomers.forEach(customer => {
		// 	filteredCustomers = filteredCustomers.filter(cust => cust.id !== customer.id)
		// })
		// setCustomers(filteredCustomers)
		// setDisableDelete(true)
	}

	const addNewHandler = () => {
		setAddNew(true)
	}

	const selectAllHandler = () => {
		// if (selectedCustomers !== customers) {
		// 	setSelectedCustomers(customers)
		// 	setSelectAll(true)
		// } else {
		// 	setSelectedCustomers([])
		// 	setSelectAll(false)
		// 	setDisableDelete(true)
		// }
	}

	const singleSelectHandler = (customer) => {
		// let isIncluded = selectedCustomers.find(item => item.id === customer.id)
		// if (!isIncluded) {
		// 	setSelectedCustomers(prev => [...prev, customer])

		// } else {
		// 	let filteredItems = selectedCustomers.filter(item => item.id !== customer.id)
		// 	setSelectedCustomers(filteredItems)
		// }

	}
	const addItem = (customer = {}) => {
		newCustomer.mutate(customer)
	}
	const editItem = (customer) => {
		// let index = customers.findIndex(item => item.id === customer.id)

		// if (index !== -1) {
		// 	customers[index] = customer
		// }
		// setCustomers(customers)
	}

	const handler = () => {
		setToggleActionModal(false)
	}

	const searchHandler = (searchKeyword) => {

		// if (searchKeyword === "") {
		// 	setCustomers([])
		// } else {
		// 	const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchKeyword))
		// 	setCustomers(filteredCustomers)
		// }
	}

	if (isError) return <h1 style={{ color: "#fff" }}>{error.message} isError</h1>

	return (
		<>
			<Helmet>
				<title>Customers</title>
			</Helmet>
			<ItemContainer>
				<ItemHeader
					header="Customers"
					addNewHandler={addNewHandler}
					deleteMethod={() => setDeleteModal(true)}
					disableDelete={disableDelete}
					searchHandler={searchHandler}
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
				<ItemsContainer>
					{isLoading && (
						<LoaderWrapper>
							<SectionLoader />
						</LoaderWrapper>
					)}
					{hasError && <h1>Something went wrong</h1>}
					{data?.data?.map((customer, index) => (
						<ItemWrapper key={customer.id}>
							<SelectItem
								onClick={e => singleSelectHandler(customer)}
							>
								{selectedCustomers.find(item => item.id === customer.id) && <Tick />}
							</SelectItem>
							<Items>
								<li className="sl-no">{firstItemCount + index}</li>
								<li>{customer.name ? customer.name : "----------"}</li>
								<li className='age'>{customer.age ? customer.age : "-----"}</li>
								<li>{customer.mobile_number ? customer.mobile_number : "----------"}</li>
								<li className='address'>{customer.address && customer.address.slice(0, 15)}{customer.address && customer.address.length >= 15 && "..."}{!customer.address && "----------"}</li>
								<li>{customer.job ? customer.job : "----------"}</li>
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
				</ItemsContainer>
				{!isLoading && (
					<PaginationContainer>
						<ReactPaginate
							pageCount={data?.paginated_data?.total_pages}
							onPageChange={({ selected }) => { !isPreviousData && setCurrentPage(selected + 1) }}
							activeLinkClassName='active-link'
							previousLabel='<'
							nextLabel='>'
							disabledLinkClassName='disabled-link'
							breakLinkClassName='break-link'
							activeClassName={'item active '}
							breakClassName={'item break-me '}
							breakLabel={'...'}
							containerClassName={'pagination'}
							disabledClassName={'disabled-page'}
							nextClassName={"item next"}

						/>
					</PaginationContainer>
				)}
			</ItemContainer>
			{addNew && (
				<AddNew
					onClose={() => setAddNew(false)}
					initialState={addNewInitialState}
					fields={addNewFields}
					header="Create Customer"
					addItem={addItem}
					apiURI="/customers/create/"
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


const LoaderWrapper = styled.section`
	width: 100%;
	height: 590px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const HeadContainer = styled.div`
	margin: 22px 0;
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

const ItemContainer = styled.main``
const ItemsContainer = styled.section`
	/* height: calc(100vh - (96px+88px+92px+50px+300px)); */
	/* overflow-y: scroll; */
	height: 540px;
	::-webkit-scrollbar{
		display: none;
	}
`

const PaginationContainer = styled.section`
	display: flex;
	justify-content: center;
	padding-top: 12px;

	*{
		user-select: none;
	}

	.pagination {
		display: flex;
		gap: 12px;

		li{

			a{
				background-color:#4b198994;
				width: 35px;
				height: 35px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: 600;
				border-radius: 12px;
				cursor: pointer;
				color: #9d9d9d;
			}
		}
	}

	.item {
		/* display: flex;
		background-color: #4b1989;
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer; */
		a{
			color: #4b1989;
		}
	}

	.break-me {}

	.next {
		margin-left: 32px;
		a{
			/* border-radius: 50% !important; */
			/* border: 1px solid #fff; */
		}
	}

	.active {
		a{
			border: 1px solid #fff;
			background-color: #4b1989 !important;
			color: #fff !important;
		}
	}

	.pagination-page {}

	.previous {
		margin-right: 32px;
		a{
			/* border-radius: 50% !important; */
			/* border: 1px solid #fff; */
		}
	}
	.disabled-page {
		a{
			cursor: not-allowed !important;
			border: none;
			color: #111 !important;
		}
	}

`