import React from 'react'
import "../styles/login.css"
import Logo from "../images/logo_remove.png"
function Login() {
  return (
    <div className='login'>
        <div className='img'>
          <img src={Logo} alt="" />
        </div>
        <div className='content'>
            <div>
              <label htmlFor="Email">Email</label>
              <input type="email" name='email' placeholder='Enter Your Email' />
            </div>
            <div>
              <label htmlFor="Email">Password</label>
              <input type="password" name='password' placeholder='Enter Your Password' />
            </div>
            <div className='btnlogin'>
              <button>Log in</button>
            </div>
            <div>
              <a href="reset">Reset password</a>
            </div>
        </div>
    </div>
  )
}

export default Login