import { errorTypes } from './error-type';

export const setErrors = error => ({
  type: errorTypes.SET_ERRORS,
  payload: error.response.data ? error.response.data.msg : error,
});

export const removeErrors = () => ({
  type: errorTypes.REMOVE_ERRORS,
});
