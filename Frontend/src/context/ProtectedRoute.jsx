import {Navigate} from 'react-router-dom'
import React from 'react';
import {useAuth} from './AuthContext.jsx'

export default function ProtectedRoute({children}){
    // const navigate=useNavigate();
    // const { user, loading }=useAuth();

    const isAuthenticated=localStorage.getItem('user');
    if(!isAuthenticated)
    {
        
       return <Navigate to="/login" replace/>

    }
   
    return children;

    }