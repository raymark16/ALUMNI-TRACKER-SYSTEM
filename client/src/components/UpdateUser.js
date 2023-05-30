import Jobs from './Jobs';
import './Login.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useContext, useState } from "react"
import AuthContext from '../context/Auth';
const URLi = 'http://localhost:5000'

const UpdateUser = ({setForceRender}) => {
  const { userInfo, verifyAuth } = useContext(AuthContext);
  const [updateUserPicture,setUpdateUserPicture] = useState('')
  const [file,setFile] = useState('')
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
      if(userInfo.program == e.program){
        document.getElementById('program_list').value = e.name
      }
    })
  }

  getPrograms()

  const updateUserSubmit = async (e) => {
    e.preventDefault()
    if(!e.target.fname.value || !e.target.lname.value || !e.target.email.value || !e.target.phone.value || !e.target.position.value || e.target.program.value == 'Program: --' || !e.target.date.value || updateUserPicture == '') {
      toast.error('All Fields Are Required')
      return 
    }
    
    try {
      const formData = new FormData()  
      formData.append('firstname',e.target.fname.value)
      formData.append('lastname',e.target.lname.value)
      formData.append('email',e.target.email.value)
      formData.append('phone',e.target.phone.value)
      formData.append('position',e.target.position.value)
      formData.append('date_graduated',e.target.date.value)
      formData.append('program',programs[e.target.program.value])
      formData.append('userEmail', userInfo.email)
      formData.append('userImage', userInfo.image)
      formData.append('image',updateUserPicture)
      
      await axios.patch(`${URLi}/update-user`, formData, {
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

  

  return (
    <div>
      <div className="wrapper1 fadeInDown">
        <h1 className='fadeIn first'>Update Information</h1>
            <div id="formContent" className='pt-4'>
            <img src={file === '' ? uploadedPicture : file} className='fadeIn first rounded' alt='image' width='150px' height='150px'></img>
                <form onSubmit={updateUserSubmit}>
                <div className='d-flex justify-content-around'>
                <div className='d-flex flex-column w-50 align-items-end rounded-circle'>
                    <input type="text" id="fname" autoComplete='off' defaultValue={userInfo?.firstname} required className="fadeIn first" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" autoComplete='off' defaultValue={userInfo.lastname} required className="fadeIn second" name="lname" placeholder="Last Name"/>
                    <input type="email" id="email" autoComplete='off' defaultValue={userInfo.email} required className="fadeIn third" name="email" placeholder="Email"/>
                    <input type="text" id="phone" pattern="^(09|\+639)\d{9}$" autoComplete='off' defaultValue={userInfo.phone} required className="fadeIn fourth" name="phone" placeholder="Phone"/>
                    </div>
                    <div className='d-flex flex-column w-50'>
                    <input type="text" id="position" autoComplete='off' defaultValue={userInfo.position} required className="fadeIn first" name="position" placeholder="Position: ex.Employee/Owner/Lawyer"/>
                    <div className='program_list d-flex ms-1 w-100'> <select required className="fadeIn second" id='program_list' name="program"><option>Program: --</option></select></div>
                    <input type="text" id="date" autoComplete='off' defaultValue={userInfo.date_graduated} required className="fadeIn third" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated"/>
                    <input type='text' id='filePicture' className='fadeIn fourth' accept='.png, .jpg, .jpeg' onClick={(e) => e.target.type = 'file'} onChange={onUpload} required name='product_image' placeholder="Upload Picture"></input>
                    </div>
                    
                    </div>
                    <input type="submit" className="fadeIn fifth" value="Submit"/>
                </form>
            
            </div>
          <Jobs></Jobs>
        </div>
    </div>
  )
}

export default UpdateUser