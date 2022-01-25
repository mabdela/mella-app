import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  addAdmin,
  deleteAdmin,
  getAdmin,
  searchAdminByEmail,
  searchAdminByName,
} from './user-action';
import { userActionTypes } from './users-types';

export function* addSuperAdminSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const addedAdmin = yield call(
      apiData,
      `${process.env.REACT_APP_ADD_ADMIN}`,
      action.payload,
      'POST'
    );
    yield put(addAdmin({ message: addedAdmin.data.message }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* getSuperAdminSaga() {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });

    const admins = yield call(
      apiData,
      `${process.env.REACT_APP_GET_ADMINS}`,
      null,
      'GET'
    );

    yield put(getAdmin(admins));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteSuperAdminSaga(action) {
  try {
    // yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    yield call(
      apiData,
      `${process.env.REACT_APP_DELETE_ADMIN_BY_ID}/${action.payload}`,
      null,
      'DELETE'
    );

    yield put(
      deleteAdmin({
        message: `Admin deleted successfully.`,
        id: action.payload,
      })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchSuperAdminByNameSaga(action) {
  try {
    const searchData = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_BY_NAME}/${action.payload}`,
      null,
      'GET'
    );
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });

    yield put(searchAdminByName(searchData.Admin));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* searchSuperAdminByEmailSaga(action) {
  try {
    const searchData = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_BY_EMAIL}/${action.payload}`,
      null,
      'GET'
    );
    console.log('search admin by email: ', action.payload);
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });

    yield put(
      searchAdminByEmail({ msg: searchData.msg, admin: searchData.Admin })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}
