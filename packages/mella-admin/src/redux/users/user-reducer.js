import { userActionTypes } from './users-types';

const initialState = {
  auth: {},
  users: [],
  user: {},
  search: [],
  isAuthenticated: false,
  message: {},
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER:
      return {
        ...state,
        auth: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case userActionTypes.SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case userActionTypes.REMOVE_USER_LOADING:
      return {
        ...state,
        loading: false,
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
        search: [action.payload],
        loading: false,
      };
    case userActionTypes.SEARCH_BY_ID:
      return {
        ...state,
        search: [action.payload],
        loading: false,
      };

    case userActionTypes.DELETE_USERS:
      return {
        ...state,
        user: {},
        users: [],
        loading: false,
      };
    case userActionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        message: action.payload,
        remove: true,
      };

    case userActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: {},
      };

    default:
      return state;
  }
};
