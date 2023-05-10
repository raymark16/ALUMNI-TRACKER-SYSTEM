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
  const [users, setUsers] = useState([])
  const { verifyAuth, userInfo } = useContext(AuthContext);
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
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
        // if(labels.includes(e.date_graduated)){
        //   let idx = labels.indexOf(e.date_graduated);
        //   data_values[idx] += 1;
        // }else{
        if (e.date_graduated in userData){
          userData[e.date_graduated]['programs'].push(e.program)
        }else{
          userData[e.date_graduated] = {programs: []}
          userData[e.date_graduated]['programs'].push(e.program)
        }
        
        // }
        setUsers(prevObj => [...prevObj, resultObj])
      })

    }
    getUsers()
  }, [])

  useEffect(() => {
    let labels = []
    let values = []

    if(year != ''){
      Object.entries(userData).forEach((e) => {
        const [k, v] = e
        if(k.includes(year)){
          v.programs.forEach((z) => {
            if (labels.includes(z)){
              let idx = labels.indexOf(z)
              values[idx] += 1
            }else{
              labels.push(z)
              values.push(1)
            }
          })
        }else{

        }
      })
    }
    console.log(labels)
    console.log(values)
    setChartData({
      labels: labels,
      datasets: [
        {
          label: year,
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    })
    
    }, [program, year])

  return (
    <div>
      <div id='bar_chart' style={{display: userInfo.role == 1 ? 'block' : 'none' }}>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Program
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => setProgram('bsit')}>bsit</button>
            <button className="dropdown-item" onClick={() => setProgram('bscs')}>bscs</button>
            <button className="dropdown-item" onClick={() => setProgram('bsed')}>bsed</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={() => setProgram('')}>show all</button>
          </div>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Year
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => setYear('2023')}>2023</button>
            <button className="dropdown-item" onClick={() => setYear('2021')}>2021</button>
            <button className="dropdown-item" onClick={() => setYear('2020')}>2020</button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={() => setYear('')}>show all</button>
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
      <TableUsers users={users}/>
    </div>
  )
}

export default MainPage