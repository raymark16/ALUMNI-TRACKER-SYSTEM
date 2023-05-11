import {Routes, Route, Navigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/Auth';
import PrivateRoutes from './components/PrivateRoutes';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import UpdateUser from './components/UpdateUser';
import Layout from './components/Layout';

export const URL = 'http://localhost:5000'

function App() {
  const { auth, userInfo } = useContext(AuthContext);
  const [forceRender, setForceRender] = useState(false)
  return (
    <>
    <Toaster
    position='top-right'
    toastOptions={{
      style: {
        fontSize: '1.5rem'
      }
    }}
  ></Toaster>
    <Routes>
    <Route element={<Layout/>}>
        <Route path='/login' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Login />}/>
        <Route path='/register' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Register/>}/>
        <Route element={<PrivateRoutes/>}> 
              <Route path='/' element={userInfo?.role === '2' ? <UpdateUser setForceRender={setForceRender}/> : <MainPage forceRender={forceRender}/>}/>
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
    </Route>
      
    </Routes>
    </>
  );
}

export default App;
