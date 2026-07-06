import React from 'react'
import{Link} from 'react-router-dom'
import '../styles/form.scss'
const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="">
           <input type = "text" name = "username" placeholder='Enter Username'/>
           <input type = "text" name = "password" placeholder='Enter Password'/>
           <button type = "submit">submit</button>
        </form>
        <p>Don't have an account??<Link className='toggleAuthForm' to = "/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
