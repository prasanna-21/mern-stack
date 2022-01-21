import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPosts} from '../../actions/post';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {
    const {posts}=useSelector(state=>state.post);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getPosts())
    },[getPosts])
  return (
        <section className='container'>
            <h2 className='large text-primary'>Posts</h2>
            <p className="lead"><i className="fas fa-user"></i>Welcome to the community</p>
            <PostForm />
            <div className="posts">
                {posts.map(post=>(
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>

        </section>
  );
};

export default Posts;
