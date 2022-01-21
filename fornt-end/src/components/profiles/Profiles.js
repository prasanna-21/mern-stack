import React,{useEffect,Fragment} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = () => {
    const {profile,loading,profiles}=useSelector((state)=>state.profile);
    // const {loading,profiles}=profile;
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllProfiles())
    },[getAllProfiles])
    console.log(profile)
    ///add spinner
  return <Fragment>
      <section className='container'>
          
        {loading ?(<h2>Loading..</h2>)
                    :(<Fragment>
                        <h1 className="large text-primary">Developers</h1>
                        <p className='lead'>
                            <i className="fab fa-connectdevelop"></i>
                            developers
                        </p>
                        <div className="profiles">
                            {profiles.length>0 ?(profiles.map(profile=>(
                                <ProfileItem key={profile._id} profile={profile}/>
                            ))
                            ):(<h4>No profiles found..</h4>)}
                        </div>
                    </Fragment>
                    )}
        </section>
  </Fragment>;
};

export default Profiles;
