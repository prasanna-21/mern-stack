import React,{Fragment} from 'react';
import Moment from 'react-moment'

const ProfileEducation = ({education:{school,degree,fieldofstudy,current,from,to,description}}) => {
  return (
    <Fragment>
        <div>
          <h3 className="text-dark">{school}</h3>
          {/* <p>Oct 2011 - Current</p> */}
          <p><strong>Degree: </strong>{degree}</p>
          <p><Moment format='YYYY/MM/DD'>{from}</Moment>-{!to ? "NOW": <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>

          <p><strong>FieldOfStudy: </strong>{fieldofstudy}</p>

          <p>
            <strong>Description: </strong>{description}
          </p>
        </div>
    </Fragment>
  )
}

export default ProfileEducation;
