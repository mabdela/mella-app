import React from 'react';
// import { Modal, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeUserRequest } from '../../redux/users/user-action';
import { deleteCommentRequest } from '../../redux/comment/comment-action';

import CommonPopUp from '@mono-repo/common/modal/pop-up';
import { deleteQuizRequest } from 'src/redux/quizzes/quizzes-actions';
import { useSelector } from 'react-redux';

const PopUp = ({ open, handleClose, id, firstname, lastname }) => {
  const dispatch = useDispatch();
  const userid = useSelector(state => state.auth.auth._id);

  const deleteUser = () => {
    dispatch(removeUserRequest(id));
    handleClose();
  };

  const deleteComment = () => {
    dispatch(deleteCommentRequest(id));
    handleClose();
  };

  const deleteQuiz = () => {
    dispatch(deleteQuizRequest({ obId: userid, questionId: id }));
    handleClose();
  };
  return (
    <CommonPopUp
      open={open}
      handleClose={handleClose}
      question={id}
      firstname={firstname}
      lastname={lastname}
      deleteComment={deleteComment}
      deleteUser={deleteUser}
      deleteQuiz={deleteQuiz}
    />
  );
};

export default PopUp;
