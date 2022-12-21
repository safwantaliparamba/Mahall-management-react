import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardRoutesWrapper from '../includes/dashboard/DashboardRoutesWrapper'
import Customers from '../screens/Customers'
import MainDashboard from '../screens/MainDashboard'
import Houses from '../screens/Houses'
import Employees from '../screens/Employees'
import Members from '../screens/Members'
import Finances from '../screens/Finances'


const DashboardRouter = () => {
	return (
		<>
			<DashboardRoutesWrapper>
				<Routes>
					<Route path="dashboard/"  element={<MainDashboard />} />
					<Route path="customers/" element={<Customers />} />
					<Route path="houses/" element={<Houses />} />
					<Route path="employees/" element={<Employees />} />
					<Route path="members/" element={<Members />} />
					<Route path="finances/" element={<Finances />} />
				</Routes>
			</DashboardRoutesWrapper>
		</>
	)
}

export default DashboardRouter