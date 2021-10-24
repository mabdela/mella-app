import { userActionTypes } from './users-types';

const initialState = {
  users: [],
  user: {},
  search: [],
  message: null,
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
        loading: false,
      };

    case userActionTypes.ADD_USER:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };

    case userActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case userActionTypes.REMOVE_USER:
      return {
        ...state,
        users: action.payload.users,
        message: action.payload.message,
        loading: false,
      };

    default:
      return state;
  }
};
