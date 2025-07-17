import React from 'react'
import { useAuth } from '../../context/useAuth'

const Register = () => {
  const {login} = useAuth();
  return (
    <div>
      <button onClick={() => login("John Doe", "user")}>Login</button>
    </div>
  )
}

export default Register