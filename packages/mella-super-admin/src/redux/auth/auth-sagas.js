import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { loginUser, logoutUser } from './auth-action';
import { authActionType } from './auth-types';

export function* loginSuperAdminSaga(action) {
  try {
    yield put({ type: authActionType.SET_AUTH_LOADING });
    const loginUserData = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_LOGIN}`,
      action.payload,
      'POST'
    );
    yield put(loginUser(loginUserData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* logoutSuperAdminSaga() {
  try {
    yield put({ type: authActionType.SET_AUTH_LOADING });
    yield call(apiData, `${process.env.REACT_APP_LOGOUT_ADMIN}`, null, 'POST');
    yield put(logoutUser());
  } catch (error) {
    yield put(setErrors(error));
  }
}
