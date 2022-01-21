import React ,{useState}from 'react'
import {Link,Navigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {loginUser} from '../../actions/auth'

const Login = () => {
  const isAuthenticate=useSelector(state=>state.auth.isAuthenticate)
  const [formData,setFormData]=useState({
          email:"",
          password:"",
      })
  const dispatch=useDispatch();
      const {email,password}=formData;
      const handleChange=(e)=>{
          setFormData({...formData,[e.target.name]:e.target.value})
      }
      const handleSubmit=async (e)=>{
          e.preventDefault();
        console.log(formData);
        dispatch(loginUser({email,password}))
          }
     if(isAuthenticate){
        return <Navigate to="/dashboard"/>
    }
    return (
            <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required/>
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
                  required
                />
              </div>
            
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </section>
    )
}

export default Login
