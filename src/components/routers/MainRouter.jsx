import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardRouter from './DashboardRouter'

const MainRoute = () => {
  return (
    <Routes>
        <Route path="" element={<Main />} />
        <Route path="dashboard/*" element={<DashboardRouter />} />
    </Routes>
  )
}

export default MainRoute

const Main = () =>{
    return <Navigate to='/dashboard/dashboard/' />
}