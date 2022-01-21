import React from 'react';
import Moment from 'react-moment';
import { useSelector,useDispatch } from 'react-redux';
import { removeComment } from '../../actions/post';

const CommentItem = ({postId,comment:{_id,text,user,name,avatar,date}}) => {
    const {auth}=useSelector(state=>state)
    const dispatch=useDispatch();
  return (
    <div className="post bg-white p-1 my-1">
        <div>
            <a href="profile.html">
                <img
                className="round-img"
                src={avatar}
                alt=""
                />
                <h4>{name}</h4>
            </a>    
        </div>
        <div>
        <p className="my-1">
            {text}
        </p>
        <p className="post-date">
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {auth.isAuthenticate && !auth.isLoading && user===auth.user._id && <button className='btn btn-danger' onClick={()=>dispatch(removeComment(postId,_id))}><i className="fas fa-times"></i></button>}
        </div>
    </div>
  );
};

export default CommentItem;
