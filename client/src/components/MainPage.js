import axios from "axios"
import { URL } from "../App"
import AuthContext from '../context/Auth';
import toast from 'react-hot-toast'
import { useContext } from "react";


const MainPage = () => {
  const { verifyAuth, userInfo } = useContext(AuthContext);

  const Logout = async () => {
    await axios.get(`${URL}/logout`)
    verifyAuth()
    toast.success('Logout successful')
  }
  
  return (
    <div>
      <h1>Main page {userInfo.username}</h1>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default MainPage