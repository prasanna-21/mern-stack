import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component:Component}) => {
    const {isAuthenticate,isLoading}=useSelector(state=>state.auth)
    if(isLoading) return <h2>Loading..</h2>;
    if(isAuthenticate) return <Component />
    return <Navigate to="/login"/>
       
}

export default PrivateRoute
