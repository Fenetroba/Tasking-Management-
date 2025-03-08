import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayer = () => {
  return (
    <div>UserLayer
     
    <Outlet/>
    </div>
  )
}

export default UserLayer