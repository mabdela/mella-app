import { authActionType } from './auth-types';

export const loginUser = user => ({
  type: authActionType.LOGIN_USER,
  payload: user,
});

export const setLoading = () => ({
  type: authActionType.SET_AUTH_LOADING,
});

export const logoutUser = () => ({
  type: authActionType.LOGOUT_USER,
});
// action creators

export const loginUserRequest = form => ({
  type: authActionType.LOGING_USER,
  payload: form,
});

export const logoutUserRequest = () => ({
  type: authActionType.LOGING_OUT_USER,
});
