import { userActionTypes } from './users-types';

export const loginUser = user => ({
  type: userActionTypes.LOGIN_USER,
  payload: user,
});

export const removeMessage = () => ({
  type: userActionTypes.REMOVE_MESSAGE,
});

export const setLoading = () => ({
  type: userActionTypes.SET_USER_LOADING,
});

export const removeUserLoading = () => ({
  type: userActionTypes.REMOVE_USER_LOADING,
});

export const deleteUsers = () => ({
  type: userActionTypes.DELETE_USERS,
});

export const getUsers = users => ({
  type: userActionTypes.GET_USERS,
  payload: users,
});

export const removeUsers = () => ({
  type: userActionTypes.REMOVE_USER,
});

export const getUserByEmail = user => ({
  type: userActionTypes.SEARCH_BY_EMAIL,
  payload: user,
});

export const getUserById = user => ({
  type: userActionTypes.SEARCH_BY_ID,
  payload: user,
});

export const updatePassword = updateData => ({
  type: userActionTypes.UPDATE_PASSWORD,
  payload: updateData,
});

// action creators

export const loginUserRequest = form => ({
  type: userActionTypes.LOGING_USER,
  payload: form,
});

export const getUsersRequest = () => ({
  type: userActionTypes.GET_USERS_REQUEST,
});

export const removeUserRequest = id => ({
  type: userActionTypes.REMOVE_USER_REQUEST,
  payload: id,
});

export const getUserByIdRequest = id => ({
  type: userActionTypes.SEARCHING_BY_ID,
  payload: id,
});

export const getUserByEmailRequest = email => ({
  type: userActionTypes.SEARCHING_BY_EMAIL,
  payload: email,
});

export const updatePasswordRequest = data => ({
  type: userActionTypes.UPDATING_PASSWORD,
  payload: data,
});