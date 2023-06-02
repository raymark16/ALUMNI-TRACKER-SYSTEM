import Jobs from './Jobs';
import './Login.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useContext, useState, useEffect } from "react"
import AuthContext from '../context/Auth';
import { useNavigate } from 'react-router-dom';
const URLi = 'http://localhost:5000'

const UpdateUser = ({ setForceRender }) => {
  const navigate = useNavigate()
  const { userInfo, verifyAuth } = useContext(AuthContext);
  const [updateUserPicture, setUpdateUserPicture] = useState('')
  const [currentStartDate, setCurrentStartDate] = useState('')
  const [currentEndDate, setCurrentEndDate] = useState('')
  const [currentTimePeriod, setCurrentTimePeriod] = useState('')
  const [file, setFile] = useState('')
  var programs = {}

  const getPrograms = async () => {
    const result = await axios.get(`${URLi}/get-programs`)
    result.data.result.forEach((e) => {
      let temp_btn = document.createElement('option')
      temp_btn.className = 'dropdown-item'
      temp_btn.id = e.program
      temp_btn.textContent = e.name
      document.getElementById('program_list').appendChild(temp_btn)
      programs[e.name] = e.program
      if (userInfo.program == e.program) {
        document.getElementById('program_list').value = e.name
      }
    })
  }

  getPrograms()

  const updateUserSubmit = async (e) => {
    e.preventDefault()
    if (!e.target.fname.value || !e.target.lname.value || !e.target.email.value || !e.target.phone.value || e.target.program.value == 'Program: --' || !e.target.date.value || updateUserPicture == '' ||
      !e.target.position.value ||
      !e.target.company_name.value ||
      e.target.company_type.value == '--' ||
      ((e.target.currently_working.checked && !e.target.start_date.value) ||
        (!e.target.currently_working.checked && (!e.target.start_date.value || !e.target.end_date.value)))) {
      toast.error('All Fields Are Required')
      return
    }

    try {
      const form_PersonalInfo = new FormData()
      form_PersonalInfo.append('firstname', e.target.fname.value)
      form_PersonalInfo.append('lastname', e.target.lname.value)
      form_PersonalInfo.append('email', e.target.email.value)
      form_PersonalInfo.append('phone', e.target.phone.value)
      form_PersonalInfo.append('date_graduated', e.target.date.value)
      form_PersonalInfo.append('program', programs[e.target.program.value])
      form_PersonalInfo.append('userEmail', userInfo.email)
      form_PersonalInfo.append('userImage', userInfo.image)
      form_PersonalInfo.append('image', updateUserPicture)

      await axios.patch(`${URLi}/update-user`, form_PersonalInfo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const form_JobInfo = new FormData()
      form_JobInfo.append('id', userInfo.id)
      form_JobInfo.append('position', e.target.position.value)
      form_JobInfo.append('company_name', e.target.company_name.value)
      form_JobInfo.append('company_type', e.target.company_type.value)
      form_JobInfo.append('time_period', currentTimePeriod)

      await axios.patch(`${URLi}/update-job`, form_JobInfo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setForceRender((prev) => !prev)
      await axios.get(`${URLi}/logout`)
      verifyAuth()
      toast.success('Updated User, Log In again due to changes')
    } catch (error) {

      console.log(error)
      toast.error('Error User')
    }
  }
  const uploadedPicture = `/uploads/${userInfo.image}`

  const onUpload = (e) => {
    setUpdateUserPicture(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
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
      <div className="update_user fadeInDown">
        <h1 className='fadeIn first'>Update Information</h1>
        <div className='mb-5 shadow rounded p-5' style={{ backgroundColor: 'white' }}>
          <center><img src={file === '' ? uploadedPicture : file} className='fadeIn first rounded' alt='image' width='150px' height='150px'></img></center>
          <form onSubmit={updateUserSubmit}>
            <div className='d-flex justify-content-around'>
              <div className='d-flex flex-column w-50 align-items-end rounded-circle'>
                <input type="text" id="fname" autoComplete='off' defaultValue={userInfo?.firstname} required className="fadeIn first" name="fname" placeholder="First Name" />
                <input type="text" id="lname" autoComplete='off' defaultValue={userInfo.lastname} required className="fadeIn second" name="lname" placeholder="Last Name" />
                <input type="email" id="email" autoComplete='off' defaultValue={userInfo.email} required className="fadeIn third" name="email" placeholder="Email" />
                <input type="text" id="phone" pattern="^(09|\+639)\d{9}$" autoComplete='off' defaultValue={userInfo.phone} required className="fadeIn fourth" name="phone" placeholder="Phone" />

              </div>
              <div className='d-flex flex-column w-50'>
                <div className='program_list d-flex ms-1 w-100'> <select required className="fadeIn second" id='program_list' name="program"><option>Program: --</option></select></div>
                <input type="text" id="date" autoComplete='off' defaultValue={userInfo.date_graduated} required className="fadeIn third" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated" />
                <input type='text' id='filePicture' className='fadeIn fourth' accept='.png, .jpg, .jpeg' onClick={(e) => e.target.type = 'file'} onChange={onUpload} required name='product_image' placeholder="Upload Picture"></input>

              </div>

            </div>

            <div style={{ marginLeft: '77px' }}>
              <h3 className='text-black'>Current Work</h3>
              <input type='text' placeholder='Position' name='position' required></input>
              <input type='text' placeholder='Company Name' name='company_name' required></input><br></br>
              <h6 className='text-black'>Company Type</h6><div className='company_type d-flex ms-1 w-100'><select className="fadeIn second" name='company_type' required>
                <option value="--">--</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select><br></br></div>
              <h6 className='text-black'>Time Period</h6>
              <input type="checkbox" id="currently_working" name="currently_working" onChange={CheckboxClicked} /><label htmlFor="currently_working" style={{ margin: '0px 5px' }} >Currently working here</label>
              <div className='time_period d-flex ms-1 w-100' id='time_period'>From <input type="month" id="start_date" name="start_date" style={{ margin: '0px 10px' }} onChange={SaveDate} required /> To <input type="month" id="end_date" name="end_date" style={{ margin: '0px 10px' }} onChange={SaveDate} required /></div>
            </div>
            <div className='d-flex justify-content-center' style={{ marginTop: '50px' }}>
              <input type="submit" style={{ margin: '5px', width: '20%', padding: '15px 32px', display: 'inline-block' }} className="fadeIn fifth" value="Submit" /><input type='button' style={{ margin: '5px', width: '20%', padding: '15px 32px', display: 'inline-block' }} className="fadeIn fifth" onClick={() => navigate('/')} value="Cancel" />
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}

export default UpdateUser