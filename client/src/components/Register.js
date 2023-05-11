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
    if(!e.target.email.value || !e.target.password.value || !e.target.fname.value || !e.target.lname.value || !e.target.phone.value || !e.target.position.value || !e.target.program.value || !e.target.date.value ) {
      toast.error('All Fields Are Required')
      return 
    }
    try {
      const user = {
        email: e.target.email.value,
        password: e.target.password.value,
        firstname:e.target.fname.value,
        lastname:e.target.lname.value,
        phone:e.target.phone.value,
        position:e.target.position.value,
        date_graduated:e.target.date.value,
        program:e.target.program.value,
        role:'2'
      }
      await axios.post(`${URL}/register-user`, user)
      toast.success('Register Success')
      e.target.email.value = ''
      e.target.password.value = ''
      e.target.fname.value = ''
      e.target.lname.value = ''
      e.target.phone.value = ''
      e.target.position.value = ''
      e.target.date.value = ''
      e.target.program.value = ''
      navigate('/login')
    } catch (error) {
      toast.error('Register Failed')
      console.log(error)
    }
  }
  return (
    <div>
        <div className="wrapper fadeInDown">
        <div className="alumni mb-5">
            <span className='spanA'>A</span>
            <span className='spanL'>L</span>
            <span className='spanU'>U</span>
            <span className='spanM'>M</span>
            <span className='spanN'>N</span>
            <span className='spanI'>I</span>
          </div>
            <div id="formContent">
                <Link to='/login' ><h2 className='inactive underlineHover'>Sign In</h2></Link>
                <Link to='/register' ><h2 className='active'>Sign Up</h2></Link>
                <form onSubmit={RegisterSubmit}>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn second" name="email" placeholder="Email"/>
                    <input type="password" id="password" autoComplete='off' required className="fadeIn third" name="password" placeholder="Password"/>
                    <input type="text" id="fname" autoComplete='off' required className="fadeIn second" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" autoComplete='off' required className="fadeIn second" name="lname" placeholder="Last Name"/>
                    <input type="text" id="phone" autoComplete='off' required className="fadeIn third" name="phone" placeholder="Phone"/>
                    <input type="text" id="position" autoComplete='off' required className="fadeIn third" name="position" placeholder="Position: ex.Employee/Owner/Lawyer"/>
                    <input type="text" id="program" autoComplete='off' required className="fadeIn third" name="program" placeholder="Program: ex.BSIT/BSCS"/>
                    <input type="text" id="date" autoComplete='off' required className="fadeIn third" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated"/>
                    <input type="submit" className="fadeIn fourth" value="Sign Up"/>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default Register