import './App.css';
import {Fragment,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth'
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EdtProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  // const {isAuthenticate}=useSelector(state=>state.auth.isAuthenticate)

  const dispatch=useDispatch();
  // const navigate=useNavigate();
  useEffect(()=>{
    dispatch(loadUser())

  },[])
  // console.log(isAuthenticate)
  return (
      <Router>
        <Fragment>
         <Navbar/>
         <Alert/>
         <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/dashboard" element={<PrivateRoute component={Dashboard}/>}/>
          <Route exact path="/create-profile" element={<PrivateRoute component={CreateProfile}/>}/>
          <Route exact path="/edit-profile" element={<PrivateRoute  component={EditProfile}/>}/>
          <Route exact path="/add-experience" element={<PrivateRoute component={AddExperience}/>}/>
          <Route exact path="/add-education" element={<PrivateRoute component={AddEducation}/>}/>

         </Routes>

        </Fragment>
      </Router>
    
  );
}

export default App;
