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
                <div className='d-flex justify-content-center'>
            <img src={uploadedPicture} className='fadeIn first rounded' alt='image' width='150px' height='150px'></img>
            <div className='d-flex flex-column justify-content-center ms-2'>
            <h1 className='fadeIn first'>{`${userInfo?.firstname} ${userInfo?.lastname}`}</h1>
            <h5 className='fadeIn first' style={{fontWeight: 'normal'}}>{userInfo?.position} at {userInfo?.company_name}</h5>
            <h6 className='fadeIn first' style={{fontWeight: 'normal', fontStyle: 'italic'}}>{userInfo?.time_period}</h6>
            </div>
            </div>
            <hr></hr>
            <h1 className='fadeIn first mb-3'>About me</h1>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column align-items-end me-3' style={{width:'35%'}}>
                    <h5 className='fadeIn first'>Phone:</h5>
                    <h5 className='fadeIn first'>Email:</h5>
                    <h5 className='fadeIn first'>Date graduated:</h5>
                    <h5 className='fadeIn first'>Program: </h5>
                </div>
                <div className='d-flex flex-column w-50'>
                <h5 className='fadeIn first text-start ms-2'>{userInfo?.phone}</h5>
                <h5 className='fadeIn first text-start ms-2'> {userInfo?.email}</h5>
                <h5 className='fadeIn first text-start ms-2'>{userInfo?.date_graduated}</h5>
                <h5 className='fadeIn first text-start ms-2' style={{fontSize:'20px'}}>{userProgram}</h5>
                </div>
            </div>
                <input type='button' style={{margin: '100px 5px 5px 5px',width: '25%', padding: '15px 32px', display: 'inline-block'}} className="fadeIn fifth" onClick={() => navigate('/update-user')} value="Update Profile"/>
            </div>
        </div>
  )
}

export default ViewUser