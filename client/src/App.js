import {Routes, Route, Navigate} from 'react-router-dom'
import { useContext, useState,useMemo, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import toast, { Toaster } from 'react-hot-toast'
import AuthContext from './context/Auth';
import PrivateRoutes from './components/PrivateRoutes';
import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import UpdateUser from './components/UpdateUser';
import Layout from './components/Layout';
export const URL = 'http://localhost:5000'


function App() {
  const { auth, userInfo } = useContext(AuthContext);
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
      <Route path='/login' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Login />}/>
      <Route path='/register' element={auth ? <Navigate to='/' /> : auth === undefined ? <Loading /> : <Register/>}/>
      <Route element={<PrivateRoutes/>}> 
          <Route element={<Layout/>}>
            <Route path='/' element={userInfo?.role === '2' ? <UpdateUser /> : <MainPage />}/>
          </Route>
      </Route>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
    </>
  );
}

export default App;
