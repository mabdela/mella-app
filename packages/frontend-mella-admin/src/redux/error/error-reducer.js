import { errorTypes } from './error-type';

const initialState = {
  message: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.SET_ERRORS:
      return {
        ...state,
        message: action.payload.response.data.msg,
      };
    case errorTypes.REMOVE_ERRORS:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
