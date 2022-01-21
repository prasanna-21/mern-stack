import axios from 'axios';
import { GET_PROFILE,GET_PROFILES, GET_REPOS,PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from './types';
import { setAlert } from './alert';

export const getCurrentProfile=()=>async dispatch=>{
    try{
        const res=await axios.get("http://localhost:8001/api/profile/me");
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    }catch(err){
        dispatch({type:CLEAR_PROFILE})
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })

    }
    
    
}
export const getAllProfiles=()=>async dispatch=>{
    dispatch({ type: CLEAR_PROFILE });
    try{
        const res=await axios.get("http://localhost:8001/api/profile");
        dispatch({type:GET_PROFILES,payload:res.data})

    }catch(err){
        dispatch({type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
export const getProfileById=(userId)=>async dispatch=>{
    try{
        const res=await axios.get(`http://localhost:8001/api/profile/${userId}`);

        dispatch({type:GET_PROFILE,payload:res.data})

    }catch(err){
        dispatch({type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const getGitHubRepos=(username)=>async dispatch=>{
    try{
        const res=await axios.get(`http://localhost:8001/api/profile/github/${username}`);

        dispatch({type:GET_REPOS,payload:res.data})

    }catch(err){
        dispatch({type:PROFILE_ERROR,
        payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const createProfile=(formData,navigate,edit=false)=>async dispatch=>{
    try{
    const res=await axios.post('http://localhost:8001/api/profile',formData);
    dispatch({type:GET_PROFILE,payload:res.data});
    dispatch(setAlert(edit ? "profile updated": "profile created","success"));
    if(!edit){
        navigate('/dashboard')
    }
    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
        errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }

}

export const addExperience=(formData,navigate)=>async dispatch=>{
    try{
        const res=await axios.put("http://localhost:8001/api/profile/experience",formData);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        dispatch(setAlert("Added Experience","success"));
        navigate("/dashboard")
    }catch(err){
        const errors=err.response.data.errors;
        if(errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const addEducation=(formData,navigate)=>async dispatch=>{
    try{
        const res=await axios.put('http://localhost:8001/api/profile/education',formData);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        dispatch(setAlert('added education','success'));
        navigate("/dashboard");
    }catch(err){
        const errors=err.response.data.errors;
        if(errors) {
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const deleteExperience=id=>async dispatch=>{
    try{
        const res=await axios.delete(`http://localhost:8001/api/profile/experience/${id}`);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        dispatch(setAlert('Experience removed','success'))

    }catch(err){
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const deleteEducation=id=>async dispatch=>{
    try{
        const res=await axios.delete(`http://localhost:8001/api/profile/education/${id}`);
        dispatch({type:UPDATE_PROFILE,payload:res.data});
        dispatch(setAlert('Education removed','success'))

    }catch(err){
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure want delete?')){
        try{
            await axios.delete('http://localhost:8001/api/profile');
            dispatch({type:CLEAR_PROFILE});
            dispatch({type:ACCOUNT_DELETED});
        }catch(err){
            
        dispatch({type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})

        }
    }
}