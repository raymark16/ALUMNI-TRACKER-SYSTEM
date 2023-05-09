import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import {URL} from '../App'
import toast from 'react-hot-toast'
const Register = () => {
  const navigate = useNavigate()
  const RegisterSubmit = async (e) => {
    e.preventDefault()
    if(!e.target.username.value || !e.target.email.value || !e.target.password.value) {
      toast.error('All Fields Are Required')
      return 
    }
    try {
      const user = {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role:'2'
      }
      await axios.post(`${URL}/register-user`, user)
      toast.success('Register Success')
      e.target.username.value = ''
      e.target.email.value = ''
      e.target.password.value = ''
      navigate('/login')
    } catch (error) {
      toast.error('Register Failed')
      console.log(error)
    }
  }
  return (
    <div>
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <Link to='/login' ><h2 className='inactive underlineHover'>Sign In</h2></Link>
                <Link to='/register' ><h2 className='active'>Sign Up</h2></Link>
                <form onSubmit={RegisterSubmit}>
                    <input type="text" id="username" autoComplete='off' required className="fadeIn second" name="username" placeholder="username"/>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn second" name="email" placeholder="email"/>
                    <input type="password" id="password" autoComplete='off' required className="fadeIn third" name="password" placeholder="password"/>
                    <input type="submit" className="fadeIn fourth" value="Sign Up"/>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default Register