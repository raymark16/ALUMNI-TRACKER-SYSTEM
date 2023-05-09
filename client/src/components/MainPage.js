import TableUsers from "./TableUsers";
import { useEffect,useState } from "react";
import { URL } from '../App'
import axios from "axios";

const MainPage = () => {
  const [users, setUsers] = useState([])

  useEffect(()=> {

    const getUsers = async () => {

      const result = await axios.get(`${URL}/get-users`)
      result.data.result.map((e) => {
        let resultObj = {
          firstname: e.firstname,
          lastname: e.lastname,
          email: e.email,
          phone: e.phone,
          position: e.position,
          date_graduated: e.date_graduated,
          program: e.program,
        }
        setUsers(prevObj => [...prevObj, resultObj])
    }
    )

    }
    getUsers()
  
  },[])
  return (
    <div>
      <TableUsers users={users}/>
    </div>
  )
}

export default MainPage