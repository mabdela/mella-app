import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  getUserByEmail,
  getUserById,
  getUsers,
  loginUser,
  removeUsers,
  updatePassword,
} from './user-action';
import { userActionTypes } from './users-types';

export function* loginEndUserSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const loginUserData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_ADMIN_LOGIN}`,
      action.payload,
      'POST'
    );
    // console.log(loginUserData);
    yield put(loginUser(loginUserData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* getUsersSaga() {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const users = yield call(
      apiData,
      `${process.env.REACT_APP_GET_ALL_USERS}`,
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
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const users = yield call(
      apiData,
      `${process.env.REACT_APP_USERS_BY_ID}/${action.payload}`,
      null,
      'DELETE'
    );

    yield put(removeUsers(users));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchByEmailSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const user = yield call(
      apiData,
      `${process.env.REACT_APP_USERS_BY_EMAIL}/${action.payload}`,
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
    console.log(action.payload);
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const user = yield call(
      apiData,
      `${process.env.REACT_APP_USERS_BY_ID}/${action.payload}`,
      null,
      'GET'
    );

    yield put(getUserById(user));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updatePasswordSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    yield call(
      apiData,
      `${process.env.REACT_APP_UPDATE_PASSWORD}`,
      action.payload,
      'PUT'
    );

    yield put(updatePassword({ message: 'Password successfully updated!' }));
  } catch (error) {
    yield put(setErrors(error));
  }
}
