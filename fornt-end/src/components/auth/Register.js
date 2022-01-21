import React ,{useState} from 'react'
import {Link,Navigate} from 'react-router-dom';
import {setAlert} from '../../actions/alert'
import { useDispatch,useSelector } from 'react-redux';
import {register} from './../../actions/auth';

const Register = () => {
  const isAuthenticate=useSelector(state=>state.auth.isAuthenticate)
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        password2:""
    });
    const dispatch=useDispatch()
    const {name,email,password,password2}=formData;
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(password!==password2)
          dispatch(setAlert("password does not match",'danger'));
        else{
                console.log(formData);
                dispatch(register({name,email,password}));
                // const newForm={
                //     name,
                //     email,
                //     password
                // };
                // try{
                // const config={
                //     headers:{
                //         'Content-Type':'application/json'
                //     }
                // }
                // const body=JSON.stringify(newForm);
                // const res= await axios.post('http://localhost:8001/api/users',body,config);
                // console.log(res);
              //  }catch(err){
              //      console.error(err)
              //  }

        }
    }
    if(isAuthenticate){
      return <Navigate to="/dashboard"/>
  }
    return (
        <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}  />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={formData.password2}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    )
}

export default Register
