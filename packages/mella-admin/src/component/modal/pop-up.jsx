import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUserRequest } from '../../redux/users/user-action';
import { deleteCommentRequest } from '../../redux/comment/comment-action';

import CommonPopUp from '@mono-repo/common/modal/pop-up';
import { deleteQuizRequest } from 'src/redux/quizzes/quizzes-actions';

const PopUp = ({
  open,
  handleClose,
  id,
  firstname,
  lastname,
  topicId,
  questionId,
}) => {
  const dispatch = useDispatch();

  const deleteUser = () => {
    dispatch(removeUserRequest(id));
    handleClose();
  };

  const deleteComment = () => {
    dispatch(deleteCommentRequest(id));
    handleClose();
  };

  const deleteQuiz = () => {
    dispatch(deleteQuizRequest({ topic_id: topicId, questionId: questionId }));
    handleClose();
  };
  return (
    <CommonPopUp
      open={open}
      handleClose={handleClose}
      question={questionId}
      firstname={firstname}
      lastname={lastname}
      deleteComment={deleteComment}
      deleteUser={deleteUser}
      deleteQuiz={deleteQuiz}
    />
  );
};

export default PopUp;
