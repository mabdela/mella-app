import { errorTypes } from './error-type';

const initialState = {
  message: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.SET_ERRORS:
      return {
        ...state,
        message: action.payload,
        // message: action.payload,
      };

    case errorTypes.SET_SUCCESS:
      return {
        ...state,
        message: action.payload,
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
