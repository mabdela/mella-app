import { authActionType } from '../auth/auth-types';
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
    case authActionType.LOGOUT_USER:
      return {
        ...state,
        users: [],
        user: {},
        search: [],
      };

    case userActionTypes.REMOVE_SEARCH_USER:
      return {
        ...state,
        search: [],
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
        users: state.users.filter(user => user._id !== action.payload.id),
        search: state.search.filter(search => search._id !== action.payload.id),
        message: action.payload.message,
        loading: false,
      };

    case userActionTypes.UPDATE_USER:
      const indexToUpdate = state.users.findIndex(
        user => user._id === action.payload.user._id
      );
      return {
        users: [
          ...state.users.slice(0, indexToUpdate),
          action.payload.user,
          ...state.users.slice(indexToUpdate + 1),
        ],
        message: action.payload.message,
        loading: false,
      };

    default:
      return state;
  }
};
