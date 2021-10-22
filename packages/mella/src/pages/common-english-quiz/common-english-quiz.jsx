import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizRequest } from '../../redux/main-content/main-content-actions';
import Quiz from '../../components/quiz/quiz';

const CommonEnglishQuiz = ({ quiz }) => {
  const dispatch = useDispatch();
  const hashState = useSelector(state => state.sidebar.mapObjects);
  const user = useSelector(state => state.auth.user._id);

  useEffect(() => {
    dispatch(getQuizRequest(user, hashState[quiz]));
  }, [dispatch, hashState, user, quiz]);
  return <Quiz />;
};

export default CommonEnglishQuiz;
