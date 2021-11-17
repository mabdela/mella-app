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
    console.log(action.payload);
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const addedAdmin = yield call(
      apiData,
      `${process.env.REACT_APP_ADD_ADMIN}`,
      action.payload,
      'POST'
    );
    yield put(addAdmin({ message: addedAdmin.message }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* getSuperAdminSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });

    const admins = yield call(
      apiData,
      `${process.env.REACT_APP_GET_ADMINS}`,
      null,
      'GET',
      action.payload
    );

    yield put(getAdmin(admins));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteSuperAdminSaga(action) {
  try {
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });
    const deletedAdminData = yield call(
      apiData,
      `${process.env.REACT_APP_DELETE_ADMIN_BY_ID}/${action.payload}`,
      null,
      'DELETE'
    );

    const { firstname, _id } = deletedAdminData;
    yield put(
      deleteAdmin({
        message: `Admin User ${firstname} is successfully deleted`,
        id: _id,
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

    yield put(searchAdminByName(searchData));
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
    yield put({ type: userActionTypes.SET_SUPER_ADMIN_LOADING });

    yield put(searchAdminByEmail(searchData));
  } catch (error) {
    yield put(setErrors(error));
  }
}
