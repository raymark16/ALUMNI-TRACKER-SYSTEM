import React from 'react'
import { useContext } from "react";
import AuthContext from '../context/Auth';
import axios from "axios"
import { URL } from "../App"
import toast from 'react-hot-toast'

const Header = () => {
    const { verifyAuth, userInfo, auth } = useContext(AuthContext);
    const Logout = async () => {
        await axios.get(`${URL}/logout`)
        verifyAuth()
        toast.success('Logout successful')
      }
  return (
    <nav className='navbar navbar-dark bg-dark shadow pt-2 pb-2 ps-5 pe-5 mb-3'>
        {auth && <h3 className='text-white'>Welcome, {userInfo.firstname}</h3>}
        {auth && <button onClick={Logout} className='btn btn-danger'>Logout</button>}
        
    </nav>
  )
}

export default Header