import { maincontentTypes } from './main-content-types';

const initialState = {
  selectedQuestions: [],
  quizes: [],
  loading: false,
};

export const maincontentReducer = (state = initialState, action) => {
  switch (action.type) {
    case maincontentTypes.QUIZ_LOADING:
      return {
        ...state,
        loading: true,
      };

    case maincontentTypes.REMOVE_QUIZ:
      return {
        ...state,
        quizes: [],
        selectedQuestions: [],
      };

    case maincontentTypes.GET_QUIZ:
      return {
        ...state,
        quizes: action.payload.quiz,
        selectedQuestions: action.payload.questions,
        loading: false,
      };

    case maincontentTypes.UPDATE_SELECTED_QUIZ:
      return {
        ...state,
        selectedQuestions: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
