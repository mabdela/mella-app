import { userActionTypes } from './users-types';

const initialState = {
  auth: {},
  admins: [],
  admin: [],
  message: {},
  isAuthenticated: false,
  loading: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOGIN_USER:
      return {
        ...state,
        auth: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case userActionTypes.SET_SUPER_ADMIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case userActionTypes.REMOVE_SUPER_ADMIN_LOADING:
      return {
        ...state,
        loading: false,
      };
    case userActionTypes.ADD_ADMIN:
      return {
        ...state,
        message: action.payload,
      };
    case userActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: {},
      };

    case userActionTypes.DELETE_ADMIN:
    case userActionTypes.GET_ADMIN:
      return {
        ...state,
        admins: action.payload,
        loading: false,
      };

    case userActionTypes.SEARCH_BY_NAME:
    case userActionTypes.SEARCH_BY_EMAIL:
      return {
        ...state,
        admin: action.payload,
        loading: false,
      };

    case userActionTypes.REMOVE_ADMIN:
      return {
        ...state,
        admins: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
