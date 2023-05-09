import React from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useContext } from "react";
import { URL } from '../App'
import AuthContext from '../context/Auth';

const Login = ({setUserInfo}) => {
  const navigate = useNavigate()
  const { verifyAuth } = useContext(AuthContext);
  const LoginSubmit = async (e) => {
    e.preventDefault()
    if(!e.target.email.value || !e.target.password.value) {
      toast.error('All Fields Are Required')
      return 
    }
    try {
      let user = {
        email: e.target.email.value,
        password: e.target.password.value,
      }
      const res = await axios.post(`${URL}/login-user`, user)
      setUserInfo(res.data)
      verifyAuth()
      toast.success('Login Successfully')

    } catch (error) {
      console.log(error)
      toast.error('Login Failed')
    }
  }
  return (
    <div>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <Link to='/login' ><h2 className='active'>Sign In</h2></Link>
                <Link to='/register' ><h2 className='inactive underlineHover'>Sign Up</h2></Link>
                <form onSubmit={LoginSubmit}>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn second" name="email" placeholder="email"/>
                    <input type="password" id="password" autoComplete='off' required className="fadeIn third" name="password" placeholder="password"/>
                    <input type="submit" className="fadeIn fourth" value="Log In"/>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default Login