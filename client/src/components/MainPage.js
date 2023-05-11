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

const MainPage = () => {
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
  const drawChartData = () => {
    let labels = []
    let values = []
    let dataset_lbl = ''
    
    
    if(options[1] != '' && options[0] == ''){
      setSearchInput(options[1])
      dataset_lbl = 'Students Graduated in ' + options[1]
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        const matchingPrograms = v.programs.filter((x) => {return x == options[1]})
        if(labels.includes(k.split('-')[0])){
          let idx = labels.indexOf(k.split('-')[0])
          values[idx] += matchingPrograms.length
        }else{
          labels.push(k.split('-')[0])
          values.push(matchingPrograms.length)
        }
        
      })
    }

    if(options[0] != '' && options[1] == ''){
      setSearchInput(options[0])
      dataset_lbl = 'Students Graduated in ' + options[0]
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        if(k.includes(options[0])){
          v.programs.forEach((z) => {
            if (labels.includes(z)){
              let idx = labels.indexOf(z)
              values[idx] += 1
            }else{
              labels.push(z)
              values.push(1)
            }
          })
        }
      })
    }else if(options[0] == '' && options[1] == ''){
      dataset_lbl = 'Students Graduated'
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        if(labels.includes(k.split('-')[0])){
          let idx = labels.indexOf(k.split('-')[0])
          values[idx] += v.programs.length
        }else{
          labels.push(k.split('-')[0])
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
          program: e.program,
        }

        if (e.date_graduated in userData){
          userData[e.date_graduated]['programs'].push(e.program)
        }else{
          userData[e.date_graduated] = {programs: []}
          userData[e.date_graduated]['programs'].push(e.program)
        }
        setUsers(prevObj => [...prevObj, resultObj])
      })

    }
    setTimeout(() => {
      drawChartData()
    }, 1);
    getUsers()
  }, [])

  useEffect(() => {
    drawChartData()
    }, [options])

  return (
    <div>
      <div id='bar_chart' style={{display: userInfo.role == 1 ? 'block' : 'none' }}>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Program
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => setOptions(['','bstm'])}>bstm</button>
            <button className="dropdown-item" onClick={() => setOptions(['','bscs'])}>bscs</button>
            <button className="dropdown-item" onClick={() => setOptions(['','bsed'])}>bsed</button>
            <div className="dropdown-divider"></div>
            <button id='program_all' className="dropdown-item" onClick={() => setOptions(['',''])}>show all</button>
          </div>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Year
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => setOptions(['2023',''])}>2023</button>
            <button className="dropdown-item" onClick={() => setOptions(['2021',''])}>2021</button>
            <button className="dropdown-item" onClick={() => setOptions(['2020',''])}>2020</button>
            <div className="dropdown-divider"></div>
            <button id='year_all' className="dropdown-item" onClick={() => setOptions(['',''])}>show all</button>
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
      </div>
      <TableUsers users={users} searchInput={searchInput} setSearchInput={setSearchInput}/>
    </div>
  )
}

export default MainPage