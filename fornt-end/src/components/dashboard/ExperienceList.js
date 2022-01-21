import React,{Fragment}from 'react'
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
import { useDispatch } from 'react-redux';

const ExperienceList = ({experience}) => {
    const dispatch=useDispatch();
    const experienceList=experience.map(exp=>{
        return(
            <tr key={exp._id}>
                <td className="hide-sm">{exp.company}</td>
                <td className="hide-sm">{exp.title}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>-{' '}{exp.to===null?('NOW'):(<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
                </td>
                <td>
                    <button className='btn btn-danger' onClick={()=>dispatch(deleteExperience(exp._id))}>Delete</button>
                </td>
            </tr>
        )
    })
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>{experienceList}</tbody>
            </table>
        </Fragment>
    )
}

export default ExperienceList
