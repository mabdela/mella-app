import { authActionType } from './auth-types';

const initialState = {
  auth: {},
  isAuthenticated: false,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionType.LOGIN_USER:
      return {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

    case authActionType.LOGOUT_USER:
      return {
        ...state,
        auth: {},
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case authActionType.SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
