import { userActionTypes } from './users-types';

export const setLoading = () => ({
  type: userActionTypes.SET_SUPER_ADMIN_LOADING,
});

export const removeMessage = () => ({
  type: userActionTypes.REMOVE_MESSAGE,
});

export const removeAdminLoading = () => ({
  type: userActionTypes.REMOVE_SUPER_ADMIN_LOADING,
});

export const removeAdmins = () => ({
  type: userActionTypes.REMOVE_ADMINS,
});
export const removeAdmin = () => ({
  type: userActionTypes.REMOVE_ADMIN,
});

export const getAdmin = admin => ({
  type: userActionTypes.GET_ADMIN,
  payload: admin,
});

export const addAdmin = addedData => ({
  type: userActionTypes.ADD_ADMIN,
  payload: addedData,
});

export const searchAdminByName = name => ({
  type: userActionTypes.SEARCH_BY_NAME,
  payload: name,
});

export const searchAdminByEmail = email => ({
  type: userActionTypes.SEARCH_BY_EMAIL,
  payload: email,
});

export const deleteAdmin = message => ({
  type: userActionTypes.DELETE_ADMIN,
  payload: message,
});

// action creators

export const addAdminRequest = adminData => ({
  type: userActionTypes.ADDING_ADMIN,
  payload: adminData,
});

export const searchAdminByNameRequest = name => ({
  type: userActionTypes.SEARCHING_BY_NAME,
  payload: name,
});

export const searchAdminByEmailRequest = email => ({
  type: userActionTypes.SEARCHING_BY_EMAIL,
  payload: email,
});

export const getAdminRequest = token => ({
  type: userActionTypes.GETING_ADMIN,
  payload: token,
});

export const deleteAdminRequest = id => ({
  type: userActionTypes.DELETING_ADMIN,
  payload: id,
});
