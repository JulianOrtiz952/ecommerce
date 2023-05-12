import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedAuth = () => {

  const {token} = useSelector(store => store.userInfo)
    
  if(token) {
  return <Outlet />
  }else {
    return <Navigate to="/login" />
  }
  
}

export default ProtectedAuth