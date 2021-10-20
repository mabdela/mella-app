import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  addAdmin,
  deleteAdmin,
  getAdmin,
  loginUser,
  searchAdminByEmail,
  searchAdminByName,
} from './user-action';
import { userActionTypes } from './users-types';

export function* loginSuperAdminSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const loginUserData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_ADMIN_LOGIN}`,
      action.payload,
      'POST'
    );
    yield put(loginUser(loginUserData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

// check this out

export function* addSuperAdminSaga(action) {
  try {
    console.log(action.payload);
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_ADD_ADMIN}`,
      action.payload,
      'POST'
    );
    yield put(addAdmin({ message: 'Admin Successfully added!' }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

// added to env

export function* getSuperAdminSaga() {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const admins = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_GET_ADMIN}`,
      null,
      'GET'
    );
    yield put(getAdmin(admins));
  } catch (error) {
    yield put(setErrors(error));
  }
}

// added to env

export function* deleteSuperAdminSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const deletedAdminData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_DELETE_ADMIN_BY_ID}/${action.payload}`,
      null,
      'DELETE'
    );
    console.log(deletedAdminData);
    // yield put(deleteAdmin(deletedAdminData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchSuperAdminByNameSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const searchData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_ADMIN_BY_NAME}/${action.payload}`,
      null,
      'GET'
    );
    yield put(searchAdminByName(searchData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchSuperAdminByEmailSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const searchData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_ADMIN_BY_EMAIL}/${action.payload}`,
      null,
      'GET'
    );
    yield put(searchAdminByEmail(searchData));
  } catch (error) {
    yield put(setErrors(error));
  }
}
