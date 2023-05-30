import axios from 'axios'
import { useContext, useState } from "react"
import AuthContext from '../context/Auth';
const URLi = 'http://localhost:5000'

const Jobs = ({ }) => {
    const { userInfo, verifyAuth } = useContext(AuthContext);
    const [currentStartDate, setCurrentStartDate] = useState('')
    const [currentEndDate, setCurrentEndDate] = useState('')
    const [currentTimePeriod, setCurrentTimePeriod] = useState('')

    const SaveDate = (e) => {
        if (e.target.id == 'start_date'){
            setCurrentStartDate(String(e.target.value))
        }else if(e.target.id == 'end_date'){
            setCurrentEndDate(String(e.target.value))
        }
    }

    const CheckboxClicked = (e) => {
        if (e.target.checked){
            document.getElementById('time_period').innerHTML = "From <input type='month' id='start_date' name='start_date' value='" + currentStartDate + "' style='margin: 0px 10px;'/>"
            document.getElementById("start_date").addEventListener("change", SaveDate);
            setCurrentTimePeriod(currentStartDate + " - Current")
        }else{
            document.getElementById('time_period').innerHTML = "From <input type='month' id='start_date' name='start_date' value='" + currentStartDate + "' style='margin: 0px 10px;'/> To <input type='month' id='end_date' value='" + currentEndDate + "' name='end_date' style='margin: 0px 10px;'/>"
            document.getElementById("start_date").addEventListener("change", SaveDate);
            document.getElementById("end_date").addEventListener("change", SaveDate);
            setCurrentTimePeriod(currentStartDate + " - " + currentEndDate)
        }

    }

    return (
        <div className='mb-5 shadow rounded p-5' style={{ backgroundColor: 'white' }}>
            <h3 className='text-black'>Current Work</h3>
            <input type='text' placeholder='Position'></input>
            <input type='text' placeholder='Company Name'></input><br></br>
            <h6 className='text-black'>Company Type</h6><div className='company_type d-flex ms-1 w-100'><select className="fadeIn second">
                <option value="--">--</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </select><br></br></div>
            <h6 className='text-black'>Time Period</h6>
            <input type="checkbox" id="currently_working" name="currently_working" onChange={CheckboxClicked}/><label htmlFor="currently_working" style={{margin: '0px 5px'}} >Currently working here</label>
            <div className='time_period d-flex ms-1 w-100' id='time_period'>From <input type="month" id="start_date" name="start_date" style={{margin: '0px 10px'}} onChange={SaveDate}/> To <input type="month" id="end_date" name="end_date" style={{margin: '0px 10px'}} onChange={SaveDate}/></div>
        </div>
    )
}

export default Jobs