import React from 'react'

import {useSelector} from 'react-redux';

const Alert=()=>{
    const alerts=useSelector((state)=>([...state.alert]));
    console.log(alerts)
    // console.log(alert);
    return (
        <section className='container'>
           { alerts !==null && alerts.length >0 && alerts.map(alert=>(
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div> ))}
        </section>
    )
        
    
}
export default Alert;