import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,CLEAR_PROFILE} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const register=(user)=> async dispatch=>{
    try{
        const res=await axios.post('http://localhost:8001/api/users',user);
        dispatch({type:REGISTER_SUCCESS,payload:res.data})
        dispatch(loadUser());
    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
        errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type:REGISTER_FAIL})
    }
}
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try{
        const res=await axios.get('http://localhost:8001/api/auth');
        dispatch({type:USER_LOADED,payload:res.data})
    }catch(err){
        dispatch({type:AUTH_FAIL})

    }
}
export const loginUser=(user)=>async dispatch=>{
    try{
        const res=await axios.post('http://localhost:8001/api/auth',user);
        dispatch({type:LOGIN_SUCCESS,payload:res.data})
        dispatch(loadUser())
    }catch(err){
        dispatch({type:LOGIN_FAIL})
    }
}
export const logout=()=>dispatch=>{
    console.log("logout");
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGOUT})
}