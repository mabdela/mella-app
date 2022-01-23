import { userActionTypes } from './users-types';

const initialState = {
  admins: [],
  admin: [],
  message: null,
  loading: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
        message: action.payload.message,
        loading: false,
      };
    case userActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        message: null,
      };

    case userActionTypes.DELETE_ADMIN:
      return {
        ...state,
        message: action.payload.message,
        admins: state.admins.filter(admin => admin.id !== action.payload.id),
        admin: state.admin.filter(admin => admin.id !== action.payload.id),
        loading: false,
      };
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
        message: action.payload.msg,
        loading: false,
      };

    case userActionTypes.REMOVE_ADMINS:
      return {
        ...state,
        admins: [],
        loading: false,
      };
    case userActionTypes.REMOVE_ADMIN:
      return {
        ...state,
        admin: [],
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
