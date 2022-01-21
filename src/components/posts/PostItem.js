import React,{Fragment}from 'react';
import Moment from 'react-moment';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike,unLike,deletePost } from './../../actions/post';

const PostItem = ({post:{text,name,avatar,_id,date,likes,comments,user},showActions}) => {
    const {auth}=useSelector(state=>state);
    const dispatch= useDispatch();
  return (<div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showActions && <Fragment>
              <button type="button" className="btn btn-light" onClick={(e)=>dispatch(addLike(_id))}>
              <i className="fas fa-thumbs-up"></i>{' '}<span>{likes.length>0 && <span>{likes.length}</span> }</span>
              
            </button>
            <button type="button" className="btn btn-light" onClick={(e)=>dispatch(unLike(_id))}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion {' '}{comments.length > 0 &&<span className='comment-count'>{comments.length}</span> }
            </Link>
            {auth.isAuthenticate && !auth.isLoading && user===auth.user._id &&  <button      
                                                        type="button" className="btn btn-danger" onClick={(e)=>dispatch(deletePost(_id))}><i className="fas fa-times"></i>
                                                    </button>
            }
           
              </Fragment>}
            
          </div>
        </div>);
};
PostItem.defaultProps={
  showActions:true
}
export default PostItem;
