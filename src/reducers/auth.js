import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_FAIL,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, ACCOUNT_DELETED} from '../actions/types'

let initialState={
    token:localStorage.getItem("token"),
    isAuthenticate:false,
    isLoading:true,
    user:null
}
//added new comment
const auth=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticate:true,
                isLoading:false
            };
        case USER_LOADED:
            return{
                ...state,
                ...action.payload,
                isAuthenticate:true,
                isLoading:false
            };
        case REGISTER_FAIL:
        case AUTH_FAIL:
        case LOGOUT:
        case LOGIN_FAIL:
        case ACCOUNT_DELETED:
            // console.log("123")
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticate:false,
                isLoading:false,
            };
        default :
            return state;
    }
}
export default auth;