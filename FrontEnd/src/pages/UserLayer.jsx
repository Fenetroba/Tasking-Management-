import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const UserLayer = () => {
  const {user}=useSelector(state=>state.Auth)

  return (
    <div>
      <span>Name : {user.UserName}</span>
      <span>Email : {user.UserEmail}</span>

     
    <Outlet/>
    </div>
  )
}

export default UserLayer