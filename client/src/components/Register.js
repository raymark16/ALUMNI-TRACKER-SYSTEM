import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.css'
import axios from 'axios'
import {URL} from '../App'
import toast from 'react-hot-toast'
const Register = () => {
  const navigate = useNavigate()
  const [userPicture, setUserPicture] = useState('')
  var programs = {}
  const getPrograms = async () => {
    const result = await axios.get(`${URL}/get-programs`)
    result.data.result.forEach((e) => {
      let temp_btn = document.createElement('option')
      temp_btn.className = 'dropdown-item'
      temp_btn.id = e.program
      temp_btn.textContent = e.name
      document.getElementById('program_list').appendChild(temp_btn)
      programs[e.name] = e.program
    })
  }

  getPrograms()

  const RegisterSubmit = async (e) => {
    e.preventDefault()
    if(!e.target.email.value || !e.target.password.value || !e.target.fname.value || !e.target.lname.value || !e.target.phone.value || !e.target.position.value || !e.target.program.value || !e.target.date.value || e.target.program.value == 'Program: --' || userPicture == '') {
      toast.error('All Fields Are Required')
      return 
    }
    try {
      const formData = new FormData()  
      formData.append('email', e.target.email.value)
      formData.append('password', e.target.password.value)
      formData.append('firstname',e.target.fname.value)
      formData.append('lastname',e.target.lname.value)
      formData.append('phone',e.target.phone.value)
      formData.append('position',e.target.position.value)
      formData.append('date_graduated',e.target.date.value)
      formData.append('program',programs[e.target.program.value])
      formData.append('image',userPicture)
      formData.append('role','2')

      await axios.post(`${URL}/register-user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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
                  <div className='d-flex justify-content-around'>
                    <div className='d-flex flex-column w-50 align-items-end'>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn first" name="email" placeholder="Email"/>
                    <input type="password" id="password" autoComplete='off' required className="fadeIn second" name="password" placeholder="Password"/>
                    <input type="text" id="fname" autoComplete='off' required className="fadeIn third" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" autoComplete='off' required className="fadeIn fourth" name="lname" placeholder="Last Name"/>
                    <input type="text" id="phone" autoComplete='off' pattern="^(09|\+639)\d{9}$" required className="fadeIn fifth" name="phone" placeholder="Phone"/>
                    </div>
                    <div className='d-flex flex-column w-50'>
                    <input type="text" id="position" autoComplete='off' required className="fadeIn first justify-content-end" name="position" placeholder="Position: ex.Employee/Owner/Lawyer"/>
                    <div className='program_list d-flex ms-1 w-100'> <select required className="fadeIn second justify-content-end" id='program_list' name="program"><option>Program: --</option></select></div>
                    <input type="text" id="date" autoComplete='off' required className="fadeIn third justify-content-end" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated"/>
                    <input type='text' id='filePicture' className='fadeIn fourth justify-content-end' accept='.png, .jpg, .jpeg' onClick={(e) => e.target.type = 'file'} onChange={(e) => { setUserPicture(e.target.files[0]) }} required name='product_image' placeholder="Upload Picture"></input>
                    </div>
                    </div>
                    <input type="submit" className="fadeIn sixth" value="Sign Up"/>
                    
                    
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default Register