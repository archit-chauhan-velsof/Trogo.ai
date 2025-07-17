import React from 'react'
import DashBoard from '../pages/dashboard/Index'
import { Routes,Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard/>}/>
    </Routes>
  )
}

export default AppRoutes