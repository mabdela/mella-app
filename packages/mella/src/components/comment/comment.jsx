import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentRequest,
  deleteCommentRequest,
  getCommentsRequest,
  updateLikeRequest,
} from '../../redux/user/user-action';
import './comment.scss';
import Moment from 'react-moment';

const Comment = () => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [filterdNumber, setFilteredNumber] = useState(2);
  const [clicked, setClicked] = useState(false);

  const activeContentId = useSelector(state => state.sidebar.active);
  const user = useSelector(state => state.auth.user);
  const comments = useSelector(state => state.auth.comments);

  useEffect(() => {
    dispatch(getCommentsRequest(activeContentId));
  }, [dispatch, activeContentId]);

  useEffect(() => {
    setFilteredNumber(clicked ? comments.length : 2);
  }, [clicked, comments]);

  const showFiltered = () => {
    setClicked(!clicked);
  };

  const handleKeyDown = e => {
    const commentData = {
      content: comment,
      topic_id: activeContentId.toString(),
      user_id: user._id,
    };
    if (e.key === 'Enter') {
      // dispatch an action
      dispatch(addCommentRequest(commentData));
      setComment('');
    }
  };

  return (
    <div className="comment-container">
      {comments !== null && comments !== undefined && comments.length > 2 && (
        <div className="comment-number" onClick={showFiltered}>
          {clicked ? (
            <span>Hide Comments</span>
          ) : (
            <span>
              View all {comments.length} Comments
              <br />
            </span>
          )}
        </div>
      )}{' '}
      {comments !== null &&
        comments !== undefined &&
        comments
          .filter((_, index) => index < filterdNumber)
          .map((comment, index) => (
            <div key={index}>
              <div className="comment-wrapper-container">
                <div className="comment-wrapper">
                  <span className="comment-user">{comment.firstname}</span>{' '}
                  <span>{comment.content}</span>
                </div>
                <div>
                  {comment.likes.length > 0 ? (
                    comment.likes.map((like, index) =>
                      like === user._id ? (
                        <i
                          className="fas fa-heart"
                          key={index}
                          style={{ color: 'rgb(88, 116, 173)' }}
                          onClick={() =>
                            dispatch(
                              updateLikeRequest({
                                userId: user._id,
                                commentId: comment.comment_id,
                              })
                            )
                          } // userId from backend
                        ></i>
                      ) : (
                        <i
                          className="far fa-heart"
                          key={index}
                          onClick={() =>
                            dispatch(
                              updateLikeRequest({
                                userId: user._id,
                                commentId: comment.comment_id,
                              })
                            )
                          }
                        ></i>
                      )
                    )
                  ) : (
                    <i
                      className="far fa-heart"
                      onClick={() =>
                        dispatch(
                          updateLikeRequest({
                            userId: user._id,
                            commentId: comment.comment_id,
                          })
                        )
                      }
                    ></i>
                  )}
                  {/* delete comment when authenticated user is the one that comment */}
                  {comment.user_id === user._id && (
                    <i
                      className="far fa-trash-alt"
                      onClick={() =>
                        dispatch(deleteCommentRequest(comment.comment_id))
                      }
                    ></i>
                  )}
                </div>
              </div>
              {/* reply for the comment */}
              <div className="comment-bottom-container">
                <span>
                  <Moment fromNow ago>
                    {comment.date}
                  </Moment>
                </span>
                {comment.likes.length > 0 && (
                  <span>{comment.likes.length} likes</span>
                )}
              </div>
            </div>
          ))}
      <div className="comment-input-container">
        <input
          type="text"
          name="comment"
          className="comment-input"
          placeholder="Write a Comment ..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Comment;
