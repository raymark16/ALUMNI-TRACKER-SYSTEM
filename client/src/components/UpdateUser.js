
import './Login.css'
import axios from 'axios'
import { URL } from '../App'
import { toast } from 'react-hot-toast'
import { useContext } from "react";
import AuthContext from '../context/Auth';
const UpdateUser = ({setForceRender}) => {
  const { userInfo, verifyAuth } = useContext(AuthContext);
  
  const updateUserSubmit = async (e) => {
    e.preventDefault()
    if(!e.target.fname.value || !e.target.lname.value || !e.target.email.value || !e.target.phone.value || !e.target.position.value || !e.target.program.value || !e.target.date.value ) {
      toast.error('All Fields Are Required')
      return 
    }
    try {
      let userDataObj = {
        firstname:e.target.fname.value,
        lastname:e.target.lname.value,
        email:e.target.email.value,
        phone:e.target.phone.value,
        position:e.target.position.value,
        date_graduated:e.target.date.value,
        program:e.target.program.value,
        userEmail: userInfo.email
      }
      await axios.patch(`${URL}/update-user`, userDataObj)
      setForceRender((prev) => !prev)
      await axios.get(`${URL}/logout`)
      verifyAuth()
      toast.success('Updated User, Log In again due to changes')
    } catch (error) {
      
      console.log(error)
      toast.error('Error User')
    }
  }
  return (
    <div>
      <div className="wrapper1 fadeInDown">
        <h1>Update Information</h1>
            <div id="formContent" className='pt-4'>
                <form onSubmit={updateUserSubmit}>
                    <input type="text" id="fname" autoComplete='off' required className="fadeIn second" name="fname" placeholder="First Name"/>
                    <input type="text" id="lname" autoComplete='off' required className="fadeIn second" name="lname" placeholder="Last Name"/>
                    <input type="email" id="email" autoComplete='off' required className="fadeIn third" name="email" placeholder="Email"/>
                    <input type="text" id="phone" autoComplete='off' required className="fadeIn third" name="phone" placeholder="Phone"/>
                    <input type="text" id="position" autoComplete='off' required className="fadeIn third" name="position" placeholder="Position: ex.Employee/Owner/Lawyer"/>
                    <input type="text" id="program" autoComplete='off' required className="fadeIn third" name="program" placeholder="Program: ex.BSIT/BSCS"/>
                    <input type="text" id="date" autoComplete='off' required className="fadeIn third" name="date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Date Graduated"/>
                    <input type="submit" className="fadeIn fourth" value="Submit"/>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default UpdateUser