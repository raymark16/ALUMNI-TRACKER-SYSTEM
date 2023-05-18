
import './Login.css'
import axios from 'axios'
import { URL } from '../App'
import { toast } from 'react-hot-toast'
import { useContext, useState } from "react"
import AuthContext from '../context/Auth';
const UpdateUser = ({setForceRender}) => {
  const { userInfo, verifyAuth } = useContext(AuthContext);
  const [updateUserPicture,setUpdateUserPicture] = useState('')
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
      
      await axios.patch(`${URL}/update-user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setForceRender((prev) => !prev)
      await axios.get(`${URL}/logout`)
      verifyAuth()
      toast.success('Updated User, Log In again due to changes')
    } catch (error) {
      
      console.log(error)
      toast.error('Error User')
    }
  }
  const uploadedPicture = `/uploads/${userInfo.image}`
  return (
    <div>
      <div className="wrapper1 fadeInDown">
        <h1>Update Information</h1>
        <img src={uploadedPicture} alt='image' width='100px' height='100px'></img>
            <div id="formContent" className='pt-4'>
                <form onSubmit={updateUserSubmit}>
                    <input type="text" id="fname" autoComplete='off' required className="fadeIn second" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" autoComplete='off' required className="fadeIn second" name="lname" placeholder="Last Name"/>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn third" name="email" placeholder="Email"/>
                    <input type="text" id="phone" autoComplete='off' required className="fadeIn third" name="phone" placeholder="Phone"/>
                    <input type="text" id="position" autoComplete='off' required className="fadeIn third" name="position" placeholder="Position: ex.Employee/Owner/Lawyer"/>
                    <div className='program_list'> <select required className="fadeIn third" id='program_list' name="program"><option>Program: --</option></select></div>
                    <div className='program_list'> <select required className="fadeIn third" id='program_list' name="program"><option>Program: --</option></select></div>
                    <input type="text" id="date" autoComplete='off' required className="fadeIn third" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated"/>
                    <input type='text' id='filePicture' className='fadeIn ninth' accept='.png, .jpg, .jpeg' onClick={(e) => e.target.type = 'file'} onChange={(e) => { setUpdateUserPicture(e.target.files[0]) }} required name='product_image' placeholder="Upload Picture"></input>
                    <input type="submit" className="fadeIn fourth" value="Submit"/>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default UpdateUser