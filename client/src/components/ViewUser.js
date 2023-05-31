import React from 'react'
import './ViewUser.css'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../App'
import { useState } from 'react'
const ViewUser = () => {
    const navigate = useNavigate()
    const {userInfo} = useAuth()
    const [userProgram, setUserProgram] = useState('')
    console.log(userInfo)
    const uploadedPicture = `/uploads/${userInfo?.image}`

    const getPrograms = async () => {
        const result = await axios.get(`${URL}/get-programs`)
        console.log(result.data.result)
        result.data.result.forEach((e) => {
            if(userInfo.program === e.program) {
                setUserProgram(e.name)

            }

        })
    }

  getPrograms()

    return (
        <div className="wrapper2 fadeIn_Down">
        <h1 className='fadeIn first font-weight-bold'>User Information</h1>
            <div id="form_content" className='pt-4'>
                <div className='d-flex'>
            <img src={uploadedPicture} className='fadeIn first rounded' alt='image' width='150px' height='150px'></img>
            <div className='d-flex flex-column justify-content-center ms-2'>
            <h1 className='fadeIn first'>{`${userInfo?.firstname} ${userInfo?.lastname}`}</h1>
            <h5 className='fadeIn first'>{userInfo?.position}</h5>
            </div>
            </div>
            <hr></hr>
                <div className='d-flex flex-column align-items-center'>
                    <h1 className='fadeIn first'>About me</h1>
                    <div className='d-flex flex-column ms-20'>
                        <h5 className='fadeIn first'>phone: {userInfo?.phone}</h5>
                        <h5 className='fadeIn first'>email: {userInfo?.email}</h5>
                        <h5 className='fadeIn first'>date graduated: {userInfo?.date_graduated}</h5>
                        <div className='d-flex justify-content-center'>
                        <h5 className='fadeIn first'>program: </h5>
                        <h5 className='fadeIn first text-start'>{userProgram}</h5>
                        </div>
                    </div>
                </div>
                <input type='button' style={{margin: '30px 5px 5px 5px',width: '85%', padding: '15px 32px', display: 'inline-block'}} className="fadeIn fifth" onClick={() => navigate('/update-user')} value="Update Profile"/>
            </div>
        </div>
  )
}

export default ViewUser