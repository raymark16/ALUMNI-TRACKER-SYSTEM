import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { URL } from '../App'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [userPicture, setUserPicture] = useState('')
  const [currentStartDate, setCurrentStartDate] = useState('')
  const [currentEndDate, setCurrentEndDate] = useState('')
  const [currentTimePeriod, setCurrentTimePeriod] = useState('')

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
    if (!e.target.email.value || !e.target.password.value || !e.target.fname.value || !e.target.lname.value || !e.target.phone.value || !e.target.program.value || !e.target.date.value || e.target.program.value == 'Program: --' || userPicture == '' ||
      !e.target.position.value ||
      !e.target.company_name.value ||
      e.target.company_type.value == '--' ||
      ((e.target.currently_working.checked && !e.target.start_date.value) ||
        (!e.target.currently_working.checked && (!e.target.start_date.value || !e.target.end_date.value)))) {
      toast.error('All Fields Are Required')
      return
    }
    try {
      const formData = new FormData()
      formData.append('email', e.target.email.value)
      formData.append('password', e.target.password.value)
      formData.append('firstname', e.target.fname.value)
      formData.append('lastname', e.target.lname.value)
      formData.append('phone', e.target.phone.value)
      formData.append('date_graduated', e.target.date.value)
      formData.append('program', programs[e.target.program.value])
      formData.append('image', userPicture)
      formData.append('role', '2')
      formData.append('position', e.target.position.value)
      formData.append('company_name', e.target.company_name.value)
      formData.append('company_type', e.target.company_type.value)
      formData.append('time_period', currentTimePeriod)

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
      e.target.date.value = ''
      e.target.program.value = ''
      e.target.position.value = ''
      e.target.company_name.value = ''
      e.target.company_type.value = '--'
      e.target.start_date.value = ''
      if (!e.target.currently_working.checked){
        e.target.end_date.value = ''
      }
      navigate('/login')
    } catch (error) {
      toast.error('Register Failed')
      console.log(error)
    }
  }

  const SaveDate = (e) => {
    if (e.target.id == 'start_date') {
      var date = new Date(e.target.value)
      var newDate = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      setCurrentStartDate(newDate)
    } else if (e.target.id == 'end_date') {
      var date = new Date(e.target.value)
      var newDate = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      setCurrentEndDate(newDate)
    }
  }

  useEffect(() => {
    if(document.getElementById('currently_working').checked){
      setCurrentTimePeriod(currentStartDate + " - Current")
    }else{
      setCurrentTimePeriod(currentStartDate + " - " + currentEndDate)
    }
  }, [currentStartDate, currentEndDate])

  const CheckboxClicked = (e) => {
    if (e.target.checked) {
      document.getElementById('time_period').innerHTML = "From <input type='month' id='start_date' name='start_date' required value='" + currentStartDate + "' style='margin: 0px 10px;'/>"
      document.getElementById("start_date").addEventListener("change", SaveDate);
    } else {
      document.getElementById('time_period').innerHTML = "From <input type='month' id='start_date' name='start_date' required value='" + currentStartDate + "' style='margin: 0px 10px;'/> To <input type='month' id='end_date' value='" + currentEndDate + "' name='end_date' required style='margin: 0px 10px;'/>"
      document.getElementById("start_date").addEventListener("change", SaveDate);
      document.getElementById("end_date").addEventListener("change", SaveDate);
    }
  }
  return (
    <div>
      <div className="wrapper fadeInDown">
        <div className="mb-3" style={{ fontSize: '4rem' }}>
          ALUMNI

        </div>
        <div id="formContent">
          <Link to='/login' ><h2 className='inactive underlineHover'>Sign In</h2></Link>
          <Link to='/register' ><h2 className='active'>Sign Up</h2></Link>
          <form onSubmit={RegisterSubmit}>
            <div className='d-flex justify-content-around'>
              <div className='d-flex flex-column w-50 align-items-end'>
                <input type="email" id="email" autoComplete='off' required className="fadeIn first" name="email" placeholder="Email" />
                <input type="password" id="password" autoComplete='off' required className="fadeIn second" name="password" placeholder="Password" />
                <input type="text" id="fname" autoComplete='off' required className="fadeIn third" name="fname" placeholder="First Name" />
                <input type="text" id="lname" autoComplete='off' required className="fadeIn fourth" name="lname" placeholder="Last Name" />
                <input type="text" id="phone" autoComplete='off' pattern="^(09|\+639)\d{9}$" required className="fadeIn fifth" name="phone" placeholder="Phone" />
              </div>
              <div className='d-flex flex-column w-50'>
                <div className='program_list d-flex ms-1 w-100'> <select required className="fadeIn second justify-content-end" id='program_list' name="program"><option>Program: --</option></select></div>
                <input type="text" id="date" autoComplete='off' required className="fadeIn third justify-content-end" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated" />
                <input type='text' id='filePicture' className='fadeIn fourth justify-content-end' accept='.png, .jpg, .jpeg' onClick={(e) => e.target.type = 'file'} onChange={(e) => { setUserPicture(e.target.files[0]) }} required name='product_image' placeholder="Upload Picture"></input>
              </div>
            </div>

            <div>
              <h3 className='text-white'>Current Work</h3>
              <input type='text' placeholder='Position' name='position' required></input>
              <input type='text' placeholder='Company Name' name='company_name' required></input><br></br>
              <h6 className='text-white'>Company Type</h6><div className='company_type ms-1 w-100'><select className="fadeIn second" name='company_type' required>
                <option value="--">--</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select><br></br></div>
              <h6 className='text-white'>Time Period</h6>
              <input type="checkbox" id="currently_working" name="currently_working" onChange={CheckboxClicked} /><label htmlFor="currently_working" style={{ margin: '0px 5px', color: 'white' }} >Currently working here</label>
              <div className='time_period ms-1 w-100' id='time_period' style={{ color: 'white' }}>From <input type="month" id="start_date" name="start_date" style={{ margin: '0px 10px' }} onChange={SaveDate} required /> To <input type="month" id="end_date" name="end_date" style={{ margin: '0px 10px' }} onChange={SaveDate} required /></div>
            </div>
            <input type="submit" className="fadeIn sixth" value="Sign Up" style={{ marginTop: '20px' }} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register