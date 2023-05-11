import React from 'react'
import { useContext } from "react";
import AuthContext from '../context/Auth';
import axios from "axios"
import { URL } from "../App"
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

const Header = () => {
    const { verifyAuth, userInfo, auth } = useContext(AuthContext);
    const Logout = async () => {
        await axios.get(`${URL}/logout`)
        verifyAuth()
        toast.success('Logout successful')
      }
    const classValue = 'navbar-dark bg-dark shadow pt-2 pb-2 ps-5 pe-5 mb-3'
  return (
    <nav className={auth ? `navbar ${classValue}` : `text-end ${classValue}` }>
        {auth && <h3 className='text-white'>Welcome, {userInfo.firstname}</h3> }
        {auth && <button onClick={Logout} className='btn btn-danger'>Logout</button>  }
        {auth === false && <><Link to='/login' className='btn btn-primary'>Login</Link> <Link to='/register' className='me-2 btn btn-primary'>Register</Link></>}
    </nav>
  )
}

export default Header