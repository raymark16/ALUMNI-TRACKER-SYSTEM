import TableUsers from "./TableUsers";
import AuthContext from '../context/Auth';
import { useEffect, useState, useContext } from "react";
import { URL } from '../App'
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
        position: e.position,
        date_graduated: e.date_graduated,
        program: e.Program.name,
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
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        setSearchInput(options[0])
        if (k == options[0]){
          console.log(v)
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
 
    return (
      <div style={{padding:'30px'}}>
        <div id='bar_chart' style={{display: userInfo.role == 1 ? 'block' : 'none' }}>
          <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Program
            </button>
            <div className="dropdown-menu" id='program_list' style={{maxHeight: '280px', overflowY: 'auto'}}>
              <button id='year_all' className="dropdown-item" onClick={() => setOptions(['', ''])}>Show All</button>
              <div className="dropdown-divider"></div>
            </div>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Year
            </button>
            <div className="dropdown-menu" id='year_list' style={{maxHeight: '280px', overflowY: 'auto'}}>
              <button id='year_all' className="dropdown-item" onClick={() => setOptions(['', ''])}>Show All</button>
              <div className="dropdown-divider"></div>
            </div>
          </div>
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
        </div><br></br>
        <TableUsers users={users} searchInput={searchInput} setSearchInput={setSearchInput}/>
      </div>
    )
  }

export default MainPage