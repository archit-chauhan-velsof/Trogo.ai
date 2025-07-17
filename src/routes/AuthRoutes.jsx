import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Login from '../pages/login/Index'
import Register from '../pages/register/Index'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default AuthRoutes