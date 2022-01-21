import {ADD_POST, GET_POSTS,GET_POST,POST_DELETE,POST_ERROR,UPDATE_LIKE,ADD_COMMENT,DELETE_COMMENT} from '../actions/types';
const initialState={
    posts:[],
    post:null,
    loading:true,
    errors:{}
}
const post=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case GET_POSTS:
            return {...state,posts:payload,loading:false};
        case GET_POST:
            return {...state,post:payload,loading:false}
        case ADD_POST:
            return {...state,posts:[...state.posts,payload],loading:false};
        case ADD_COMMENT:
            return {...state,post:{...state.post,comments:payload},loading:false}
        case UPDATE_LIKE:
            return {...state,posts:state.posts.map(post=>post._id===payload.id ? ({...post,likes:payload.likes}):post),loading:false};
        case DELETE_COMMENT:
            return {...state,post:{...state.post,comments:state.post.comments.filter(comment=>comment._id!==payload.id)},loading:false};
        case POST_DELETE:
            
            return {...state,posts:state.posts.map(post=>post._id!==payload.id),loading:false};
        case POST_ERROR:
            return {...state,errors:payload,loading:false};
        default :
            return state;
    }

}
export default post;