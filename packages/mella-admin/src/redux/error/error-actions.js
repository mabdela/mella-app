import { errorTypes } from './error-type';

export const setErrors = error => ({
  type: errorTypes.SET_ERRORS,
  payload: error.response.data ? error.response.data.message : 'Network Error',
});

export const setSuccess = error => ({
  type: errorTypes.SET_SUCCESS,
  payload: error,
});
export const removeErrors = () => ({
  type: errorTypes.REMOVE_ERRORS,
});
