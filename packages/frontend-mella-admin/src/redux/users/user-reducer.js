import { userActionTypes } from './users-types';

const initialState = {
  users: [],
  user: {},
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case userActionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case userActionTypes.SEARCH_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.SEARCH_BY_ID:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case userActionTypes.DELETE_USERS:
      return {
        ...state,
        user: {},
        users: [],
        loading: false,
      };

    default:
      return state;
  }
};
