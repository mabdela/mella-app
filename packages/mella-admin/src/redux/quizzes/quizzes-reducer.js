import { authActionType } from '../auth/auth-types';
import { quizzesActionTypes } from './quizzes-type';

const initialState = {
  quizzes: [],
  message: null,
  loading: false,
};

export const quizzesReducers = (state = initialState, action) => {
  switch (action.type) {
    case authActionType.LOGOUT_USER:
      return {
        ...state,
        quizzes: [],
      };
    case quizzesActionTypes.GET_QUIZ:
      return {
        ...state,
        quizzes: action.payload.quizzes || [],
        message: action.payload.message,
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
        message: action.payload.message,
        loading: false,
      };

    case quizzesActionTypes.DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(quiz => quiz.id !== action.payload.id),
        loading: false,
      };
    case quizzesActionTypes.UPDATE_QUIZ:
      const indexToUpdate = state.quizzes.findIndex(
        quiz => quiz.id === action.payload.quiz.id
      );
      return {
        quizzes: [
          ...state.quizzes.slice(0, indexToUpdate),
          action.payload.quiz,
          ...state.quizzes.slice(indexToUpdate + 1),
        ],
        message: action.payload.message,
        loading: false,
      };
    case quizzesActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
        loading: false,
      };
    default:
      return state;
  }
};
