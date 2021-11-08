import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  addUser,
  getUserByEmail,
  getUserById,
  getUsers,
  removeUsers,
  updatePassword,
  updateUser,
} from './user-action';
import { userActionTypes } from './users-types';

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

    yield put(
      removeUsers({
        id: users.id,
        message: `${users.firstname} Deleted Successfully!`,
      })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchByEmailSaga(action) {
  try {
    const user = yield call(
      apiData,
      `${process.env.REACT_APP_USERS_BY_EMAIL}/${action.payload}`,
      null,
      'GET'
    );
    yield put({ type: userActionTypes.SET_USER_LOADING });

    yield put(getUserByEmail(user));
  } catch (error) {
    console.log(error);
    yield put(setErrors(error));
  }
}

export function* searchByIdSaga(action) {
  try {
    const user = yield call(
      apiData,
      `${process.env.REACT_APP_USERS_BY_ID}/${action.payload}`,
      null,
      'GET'
    );
    yield put({ type: userActionTypes.SET_USER_LOADING });

    yield put(getUserById(user));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updatePasswordSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    const updatedPassword = yield call(
      apiData,
      `${process.env.REACT_APP_UPDATE_PASSWORD}`,
      action.payload,
      'PUT'
    );

    yield put(updatePassword(updatedPassword));
  } catch (error) {
    yield put(setErrors(error));
  }
}

//////

export function* addUserSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_USER_LOADING });
    yield call(
      apiData,
      `${process.env.REACT_APP_SIGN_UP}`,
      action.payload,
      'POST'
    );

    yield put(addUser({ message: 'User Successfully added!' }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updateUserSaga(action) {
  try {
    const updatedUser = yield call(
      apiData,
      `${process.env.REACT_APP_UPDATE_USERS}`,
      action.payload,
      'PUT'
    );
    yield put({ type: userActionTypes.SET_USER_LOADING });

    yield put(updateUser({ user: updatedUser, message: updatedUser.message }));
  } catch (error) {
    yield put(setErrors(error));
  }
}
