import { call, put } from 'redux-saga/effects';
import { apiData, URL } from '../api/api';
import { setErrors } from '../error/error-actions';
import { getUserByEmail, getUserById, getUsers } from './user-action';
import { userActionTypes } from './users-types';

export function* getUsersSaga() {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const users = yield call(
      apiData,
      `${URL.BASE_URL}/admin/protected/all_users`,
      null,
      'GET'
    );

    yield put(getUsers(users));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* removeUserSaga(action) {
  try {
    // yield put({ type: userActionTypes.SET_USER_LOADING });
    yield call(
      apiData,
      `${URL.BASE_URL}/admin/protected/user_by_id/${action.payload}`,
      null,
      'DELETE'
    );

    // yield put(getUsers(users));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchByEmailSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const user = yield call(
      apiData,
      `${URL.BASE_URL}/admin/protected/user_by_email/${action.payload}`,
      null,
      'GET'
    );

    yield put(getUserByEmail(user));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchByIdSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const user = yield call(
      apiData,
      `${URL.BASE_URL}/admin/protected/user_by_id/${action.payload}`,
      null,
      'GET'
    );

    yield put(getUserById(user));
  } catch (error) {
    yield put(setErrors(error));
  }
}
