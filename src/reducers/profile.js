import { GET_PROFILE,PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE } from '../actions/types';

const initialState={
    profile:null,
    profiles:[],
    error:{},
    loading:true,
    repos:[]
}
const profile=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {...state,profile:payload,loading:false};
        case PROFILE_ERROR:
            return {...state,error:payload,loading:false}
        case CLEAR_PROFILE:
            return {...state,profile:null,repos:[]}
        default:
            return state;
    }
}

export default profile;