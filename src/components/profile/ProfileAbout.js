import React from 'react';

const ProfileAbout = ({profile}) => {
    const {bio,skills,user:{name}}=profile
  return (
    <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{name}</h2>
        <p>
            {bio}
        </p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {skills.map((skill,index)=>(
                     <div className="p-1" key={index}><i className="fa fa-check"></i> {skill}</div>
            ))}
       
        
        </div>
  </div>
  );
};

export default ProfileAbout;
