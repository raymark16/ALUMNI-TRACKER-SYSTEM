import axios from 'axios';
import { createContext, useEffect, useState, useMemo } from 'react';
import { URL } from '../App';
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(undefined);
    const [userInfo, setUserInfo] = useState({})
   // const userValue = useMemo(()=>({userInfo,setUserInfo}),[userInfo,setUserInfo])

    const verifyAuth = async () => {
        const res = await axios.get(`${URL}/is_logged_in`);
        setUserInfo(res.data.userInfo)
        setAuth(res.data.loggedIn);
        return res.data.loggedIn;
    };
    
    useEffect(() => {
        verifyAuth()

    }, [])

    return (
        <AuthContext.Provider value={{ auth, verifyAuth, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
