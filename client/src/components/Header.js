import React from 'react'
import { useContext } from "react";
import AuthContext from '../context/Auth';
import axios from "axios"
import { URL } from "../App"
import toast from 'react-hot-toast'

const Header = () => {
    const { verifyAuth, userInfo } = useContext(AuthContext);
    const Logout = async () => {
        await axios.get(`${URL}/logout`)
        verifyAuth()
        toast.success('Logout successful')
      }
  return (
    <div>
        <h1>Welcome, {userInfo.firstname}</h1>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Header