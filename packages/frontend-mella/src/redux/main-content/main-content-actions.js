import { maincontentTypes } from './main-content-types';

export const setLoading = () => ({
  type: maincontentTypes.QUIZ_LOADING,
});

export const removeQuiz = () => ({
  type: maincontentTypes.REMOVE_QUIZ,
});

export const handleChoose = (questionIndex, choiceIndex) => ({
  type: maincontentTypes.HANDLE_CHOOSE,
  payload: { questionIndex, choiceIndex },
});

export const getQuiz = ({ quiz, questions }) => ({
  type: maincontentTypes.GET_QUIZ,
  payload: { quiz, questions },
});

export const updateSelectedQuiz = questions => ({
  type: maincontentTypes.UPDATE_SELECTED_QUIZ,
  payload: questions,
});

// action creators

export const getQuizRequest = (user_id, topic_id) => ({
  type: maincontentTypes.GETING_QUIZ,
  payload: { user_id, topic_id },
});

export const updateSelectedQuizRequest = quizData => ({
  type: maincontentTypes.UPDATING_SELECTED_QUIZ,
  payload: quizData,
});
