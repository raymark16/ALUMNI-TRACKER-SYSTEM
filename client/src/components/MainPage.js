import TableUsers from "./TableUsers";
import AuthContext from '../context/Auth';
import {Typography} from 'antd'
import { useEffect, useState, useContext } from "react";
import { URL } from '../App'
import { UserOutlined,PieChartOutlined } from '@ant-design/icons'
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
var _ = require('lodash');

const MainPage = ({forceRender}) => {
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState([])
  const { verifyAuth, userInfo } = useContext(AuthContext);
  const [options, setOptions] = useState(['','']);
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  })

  let current_year = parseInt(new Date().getFullYear()) + 1;

  const getPrograms = async () => {
    const result = await axios.get(`${URL}/get-programs`)
    result.data.result.forEach((e) => {
      let temp_btn = document.createElement('button')
      temp_btn.className = 'dropdown-item'
      temp_btn.addEventListener('click', () => {setOptions(['', String(e.name)])})
      temp_btn.id = e.program
      temp_btn.textContent = e.name
      document.getElementById('program_list').appendChild(temp_btn)
    })

    let year_list =  _.range(2010, current_year, 1).map((e) => {return String(e)})
    year_list = _.reverse(year_list)
    year_list.forEach((e) => {
      let temp_btn = document.createElement('button')
      temp_btn.className = 'dropdown-item'
      temp_btn.addEventListener('click', () => {setOptions([String(e), ''])})
      temp_btn.id = e
      temp_btn.textContent = e
      document.getElementById('year_list').appendChild(temp_btn)
    })
    const children = document.getElementsByClassName('dropdown-item')
  }

  const getUsers = async () => {
    const result = await axios.get(`${URL}/get-users`)
    
    result.data.result.forEach((e) => {

      let resultObj = {
        firstname: e.firstname,
        lastname: e.lastname,
        email: e.email,
        phone: e.phone,
        date_graduated: e.date_graduated,
        program: e.Program.name
      }
      let year = parseInt(e.date_graduated.split('-')[0])
      if (year in userData){
        userData[year]['programs'].push(e.Program.name)
      }else{
        userData[year] = {programs: []}
        userData[year]['programs'].push(e.Program.name)
      }
      setUsers(prevObj => [...prevObj, resultObj])
    })
  }

  const drawChartData = () => {
    let labels = []
    let values = []
    let dataset_lbl = ''

    if(options[1] != '' && options[0] == ''){
      dataset_lbl = options[1]
      labels =  _.range(2010, current_year, 1).map((e) => {return String(e)})
      values.length = labels.length
      values.fill(0)
      
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        const matchingPrograms = v.programs.filter((e) => {return e == options[1]})
        setSearchInput(options[1])
        if(labels.includes(k)){
          let idx = labels.indexOf(k)
          values[idx] += matchingPrograms.length
        }else{
          labels.push(k)
          values.push(v.programs.length)
        }
      })
    }else if (options[1] == '' && options[0] != ''){
      dataset_lbl = "Students Graduated in " + options[0]
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        setSearchInput(options[0])
        if (k == options[0]){

          v.programs.forEach((z) => {
            if(labels.includes(z)){
              let idx = labels.indexOf(z)
              values[idx] += 1
            }else{
              labels.push(z)
              values.push(1)
            }
          })
        }
      })
    }else{
      dataset_lbl = "Students Graduated"
      labels =  _.range(2010, current_year, 1).map((e) => {return String(e)})
      values.length = labels.length
      values.fill(0)
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        setSearchInput(options[0])
        if (labels.includes(k)){
          let idx = labels.indexOf(k)
          values[idx] += v.programs.length
        }else{
          labels.push(k)
          values.push(v.programs.length)
        }
      })
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: dataset_lbl,
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
  }
  useEffect(()=> {
    const controller = new AbortController();
    getPrograms()
    setTimeout(() => {
      drawChartData()
    }, 1000);
    getUsers()
    return () => {
      controller.abort()
    }
  }, [forceRender])
  
  useEffect(() => {
    drawChartData()
    }, [options])
    
    const userProgram1 = users?.map((e)=> e.program)
    const userProgram = userProgram1?.filter((item,
      index) => userProgram1.indexOf(item) === index);
    return (
      <div style={{padding:'30px'}}>
        <div className="ms-5">
        <Typography.Title level={3}>Dashboard</Typography.Title>
        <div className="d-flex me-5">
        <div className="rounded pt-4 pb-4 me-3" style={{marginBottom:5, display:'flex',width:'20%', justifyContent:'space-evenly', background: `linear-gradient(90deg, rgba(0,249,229,1) 0%, rgba(0,173,208,1) 100%)`}}>
              <UserOutlined style={{color:'white',fontSize:50,padding:8, marginBottom:'5px'}}/>
              <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 style={{color:'white'}}>Users</h3>
              <h4 level={4} style={{color:'white'}}>{users?.length}</h4>
              </div>
        </div>
        
        <div className="rounded pt-4 pb-4" style={{marginBottom:5, display:'flex',width:'20%', justifyContent:'space-evenly', background: `linear-gradient(90deg, rgba(204,7,143,1) 0%, rgba(255,5,68,1) 100%)`}}>
              <PieChartOutlined  style={{color:'white',fontSize:50,padding:8, marginBottom:'5px'}}/>
              <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 style={{color:'white'}}>Programs</h3>
              <h4 level={4} style={{color:'white'}}>{userProgram?.length}</h4>
              </div>
        </div>

        </div>
        </div>
        <div className="d-flex justify-content-around pt-4 pb-5" >
        <div id='bar_chart' style={{display: userInfo.role == 1 ? 'block' : 'none', backgroundColor:'white' }} className="shadow rounded mb-5 p-5">
          <div className="btn-group mb-2 pe-3">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Program
            </button>
            <div className="dropdown-menu" id='program_list' style={{maxHeight: '280px', overflowY: 'auto'}}>
              <button id='year_all' className="dropdown-item" onClick={() => setOptions(['', ''])}>Show All</button>
              <div className="dropdown-divider"></div>
            </div>
          </div>
          <div className="btn-group mb-2">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Year
            </button>
            <div className="dropdown-menu" id='year_list' style={{maxHeight: '280px', overflowY: 'auto'}}>
              <button id='year_all' className="dropdown-item" onClick={() => setOptions(['', ''])}>Show All</button>
              <div className="dropdown-divider"></div>
            </div>
          </div>
          <hr></hr>
          <div className="p-5">
          <Bar 
          options = {{
            responsive: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart',
              },
            },
          }} 
          data={chartData} 
          width={'500px'} 
          height={'500px'} />
          </div>
        </div><br></br>
        <TableUsers users={users} searchInput={searchInput} setSearchInput={setSearchInput}/>
        </div>
      </div>
    )
  }

export default MainPage