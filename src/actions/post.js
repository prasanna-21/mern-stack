import {GET_POSTS,GET_POST,POST_DELETE,POST_ERROR,UPDATE_LIKE,ADD_POST,ADD_COMMENT,DELETE_COMMENT} from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getPosts=()=>async dispatch=>{
    try{
        const res=await axios.get("http://localhost:8001/api/posts")
        dispatch({type:GET_POSTS,payload:res.data})
    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
export const getPost=(id)=>async dispatch=>{
    try{
        const res=await axios.get(`http://localhost:8001/api/posts/${id}`)
        console.log(res)
        dispatch({type:GET_POST,payload:res.data})
    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}
export const addPost=data=>async dispatch=>{
    try{
        console.log("adding post");
        const res=await axios.post("http://localhost:8001/api/posts",data);
        dispatch({type:ADD_POST,payload:res.data})
        dispatch(setAlert("post created","success"));
    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})

    }
}
export const addComment=(postId,data)=>async dispatch=>{
    try{
        const res=await axios.post(`http://localhost:8001/api/posts/comment/${postId}`,data);
        dispatch({type:ADD_COMMENT,payload:res.data});
        dispatch(setAlert("comment added","success"))
    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})

    }
}
export const removeComment=(postId,commentId)=>async dispatch=>{
    try{
        const res=await axios.delete(`http://localhost:8001/api/posts/comment/${postId}/${commentId}`);
        dispatch({type:DELETE_COMMENT,payload:{id:commentId}})
        dispatch(setAlert("comment deleted","success"));


    }catch(err){

        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}});

    }
}
export const addLike=(postId)=>async dispatch=>{
    try{
        console.log('likepost')
        const res=await axios.put(`http://localhost:8001/api/posts/like/${postId}`);

        dispatch({type:UPDATE_LIKE,payload:{id:postId,likes:res.data}})

    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})


    }
}

export const unLike=(postId)=>async dispatch=>{
    try{
        const res=await axios.put(`http://localhost:8001/api/posts/unlike/${postId}`);
        dispatch({type:UPDATE_LIKE,payload:{id:postId,likes:res.data}})


    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})
    }
}

export const deletePost=postId=>async dispatch=>{
    try{
        const res=await axios.delete(`http://localhost:8001/api/posts/${postId}`);
        console.log(res);
        dispatch({type:POST_DELETE,payload:{id:postId}});
    }catch(err){
        dispatch({type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}})

    }
}

// export const getPostById=(id)=>async disp