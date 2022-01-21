import React,{useEffect,Fragment}from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

const Post = () => {
    const {post,loading}=useSelector(state=>state.post)
    const dispatch=useDispatch();
    const params=useParams();
    useEffect(()=>{
        dispatch(getPost(params.id))
    },[getPost,params.id])
  return (
      <section className='container'>
        {loading || post===null ? (<h4>Loading...</h4>):(<Fragment>
            <Link to="/posts">Back to </Link>
            <PostItem post={post} showActions={false}/>
            <AddComment postId={post._id} />
            <div class="comments">
              {post.comments.map(comment=>(
                <CommentItem key={comment._id} comment={comment} postId={post._id}/>
              ))}
            </div>
        </Fragment>)}
      </section>
  );
};

export default Post;
