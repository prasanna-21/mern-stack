import React,{Fragment} from 'react'
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const EducationList = ({education}) => {
    const dispatch = useDispatch()
    const educationList=education.map(edu=>{
        return(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className="hide-sm">{edu.degree}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment>-{edu.to===null ? ('NOW'):(<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
                </td>
                <td>
                    <button className='btn btn-danger' onClick={()=>dispatch(deleteEducation(edu._id))}>Delete</button>
                </td>
            </tr>
            
        )
        })
    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="nide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>{educationList}</tbody>
            </table>
        </Fragment>
    )
}

export default EducationList
