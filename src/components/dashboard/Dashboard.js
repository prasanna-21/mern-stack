import React,{Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profile'; 
import DashboardActions from './DashboardActions';
import ExperienceList from './ExperienceList';
import EducationList from './EducationList';

const Dashboard = () => {
    const {user}=useSelector(state=>state.auth);
    const {profile}=useSelector(state=>state.profile);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[])
    return (
        <div className="container">
           <h2 className="large text-primary">Dashboard</h2>
           <p className='lead'><i className='fa fa-user'></i>welcome to {user && user.name}</p>
           {profile!==null?(
                <Fragment>
                    <DashboardActions/>
                    <ExperienceList experience={profile.experience}/>
                    <EducationList education={profile.education}/>
                    <button className='btn btn-danger' onClick={()=>dispatch(deleteAccount())}><i className="fas fa-user-minus" /> Delete My Account</button>
                </Fragment>):(<Fragment>
               <p>You have not yet setup profile,please add some info
               </p>
               <Link to="/create-profile" className="btn btn-primary">Create Profile</Link>
           </Fragment>)}
        </div>
    )
}

export default Dashboard
