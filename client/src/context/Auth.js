import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { URL } from '../App';
const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(undefined);

    const verifyAuth = async () => {
        const res = await axios.get(`${URL}/is_logged_in`);
        setAuth(res.data);
        return res.data;
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, verifyAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
