import React,{ReactNode} from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { authActions } from '../../store/authSlice'
import Login from '../screens/Login'
import PrivateRoute from './routes/PrivateRoute'


const AuthRouter = () => {
  return (
    <Routes>
      <Route path='login/' element={<Login />} />
      <Route path='logout/' element={<PrivateRoute><Logout /></PrivateRoute>} />
    </Routes>
  )
}

export default AuthRouter


const Logout = () => {
  const dispatch = useDispatch()
  dispatch(authActions.logout())

  return <span>loggin out</span>
}