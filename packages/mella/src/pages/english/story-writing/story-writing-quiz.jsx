// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Quiz from '../../../components/quiz/Quiz';
// import { getQuizRequest } from '../../../redux/main-content/main-content-actions';

// const StoryWritingQuiz = () => {
//   const dispatch = useDispatch();
//   const hashState = useSelector(state => state.sidebar.mapObjects);
//   const user = useSelector(state => state.auth.user._id);

//   useEffect(() => {
//     dispatch(getQuizRequest(user, hashState['Story Writing']));
//   }, [dispatch, hashState, user]);

//   return <Quiz />;
// };

// export default StoryWritingQuiz;
