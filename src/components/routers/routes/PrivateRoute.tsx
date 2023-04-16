import React, { ReactNode, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


interface Props {
    children: ReactNode
}


const PrivateRoute:React.FC<Props> = ({ children }) => {
    const isAuthenticated:boolean = useSelector(state => state.auth.isAuthenticated)
    
    return (
        isAuthenticated ? children : <Navigate to='/auth/login/' />
    )
}

export default PrivateRoute