import React, { Fragment } from 'react';
import Moment from 'react-moment'

const ProfileExperience = ({experience:{company,title,location,from,to,description}}) => {
  return (
      <Fragment>
          <div>
            <h3 className="text-dark">{company}</h3>
            <p><Moment format='YYYY/MM/DD'>{from}</Moment>-{!to ? "NOW": <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
            {/* <p>Oct 2011 - Current</p> */}
            <p><strong>Position: </strong>{title}</p>
            <p><strong>Location: </strong>{location}</p>

            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
      </Fragment>
  );
};

export default ProfileExperience;
