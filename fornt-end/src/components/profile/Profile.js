import React,{Fragment, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { getProfileById } from '../../actions/profile';
// import { getProfileById } from './../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
    const {profile,loading}=useSelector(state=>state.profile);
    const {isAuthenticate,isLoading,user}=useSelector(state=>state.auth);

    const dispatch=useDispatch();
    const params=useParams();
    // const {profile}=profile;
    useEffect(()=>{
        dispatch(getProfileById(params.id));
    },[getProfileById,params.id])
    console.log(profile,user);
  return (<Fragment>
            <section className='container'>
                {profile===null &&  loading   ? <>Loading...</>
                    :(
                        <Fragment>
                             <Link className='btn btn-dark' to="/profiles">Back to Profile</Link>
                             {isAuthenticate && isLoading===false && user?._id===profile.user._id && <Link to="/edit-profile" className='btn btn-dark'>Edit Profile</Link> }
                                <div className='profile-grid my-1'> 
                                    <ProfileTop profile={profile}/>
                                    <ProfileAbout profile={profile}/>
                                    <div class="profile-exp bg-white p-2">
                                    <h2 class="text-primary">Experience</h2>
                                    {profile.experience.length > 0 ? (
                                        <Fragment>
                                            {profile.experience.map((exp,index)=>(
                                                <ProfileExperience key={exp._id} experience={exp}/>
                                            ))}
                                        </Fragment>
                                    ):(<h4>No profile experience</h4>)
                                    }

                                    </div>     
                                    <div class="profile-edu bg-white p-2">
                                    <h2 class="text-primary">Education</h2>
                                    {profile.education.length > 0 ? (
                                        <Fragment>
                                            {profile.education.map((edu)=>(
                                                <ProfileEducation key={edu._id} education={edu}/>
                                            ))}
                                        </Fragment>
                                    ):(<h4>No profile Education</h4>)
                                    }
                                    </div> 
                                    
                                    {profile.githubusername && <ProfileGithub username={profile.githubusername}/>}
                                                                                  
                                </div>           
                        </Fragment>
                                        )
                }
                
            </section>
      </Fragment>);
};

export default Profile;
