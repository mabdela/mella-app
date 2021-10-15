import { errorTypes } from '../error/error-type';

export const setErrors = error => ({
  type: errorTypes.SET_ERRORS,
  payload: error,
});

export const removeErrors = () => ({
  type: errorTypes.REMOVE_ERRORS,
});
