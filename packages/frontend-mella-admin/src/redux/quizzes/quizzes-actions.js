import { quizzesActionTypes } from './quizzes-type';

export const setLoading = () => ({
  type: quizzesActionTypes.SET_QUIZ_LOADING,
});

export const removeMessage = () => ({
  type: quizzesActionTypes.REMOVE_MESSAGE,
});

export const removeQuiz = () => ({
  type: quizzesActionTypes.REMOVE_QUIZ,
});

export const getQuiz = quiz => ({
  type: quizzesActionTypes.GET_QUIZ,
  payload: quiz,
});

export const addQuiz = quiz => ({
  type: quizzesActionTypes.ADD_QUIZ,
  payload: quiz,
});

//
export const getQuizRequest = topicId => ({
  type: quizzesActionTypes.GETING_QUIZ,
  payload: topicId,
});

export const addQuizRequest = quizData => ({
  type: quizzesActionTypes.ADDING_QUIZ,
  payload: quizData,
});
