import { quizzesActionTypes } from './quizzes-type';

const initialState = {
  quizzes: [],
  message: {},
  loading: false,
};

export const quizzesReducers = (state = initialState, action) => {
  switch (action.type) {
    case quizzesActionTypes.GET_QUIZ:
      return {
        ...state,
        quizzes: action.payload || [],
        loading: false,
      };

    case quizzesActionTypes.SET_QUIZ_LOADING:
      return {
        ...state,
        loading: true,
      };

    case quizzesActionTypes.REMOVE_QUIZ_LOADING:
      return {
        ...state,
        loading: false,
      };

    case quizzesActionTypes.REMOVE_QUIZ:
      return {
        ...state,
        quizzes: [],
      };

    case quizzesActionTypes.ADD_QUIZ:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case quizzesActionTypes.DELETE_QUIZ:
      return {
        ...state,
        quizzes: action.payload,
      };
    case quizzesActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: {},
        loading: false,
      };
    default:
      return state;
  }
};
