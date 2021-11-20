import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  createCourse,
  deleteCourse,
  listCourse,
  updateCourse,
} from './course-action';
import { adminCourseTypes } from './course-types';

export function* createCourseSaga(action) {
  try {
    yield put({ type: adminCourseTypes.SET_LOADING });
    const createdCourse = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_CREATE_COURSE}`,
      action.payload.data,
      'POST'
    );
    yield put(createCourse(createdCourse.data.msg));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteCourseSaga(action) {
  try {
    yield put({ type: adminCourseTypes.SET_LOADING });
    const deletedCourse = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_DELETE_COURSE}`,
      action.payload,
      'DELETE'
    );
    yield put(
      deleteCourse({ msg: deletedCourse.msg, id: action.payload.course_id })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updateCourseSaga(action) {
  try {
    yield put({ type: adminCourseTypes.SET_LOADING });
    const updatedCourse = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_UPDATE_COURSE}`,
      action.payload,
      'PUT'
    );
    yield put(updateCourse(updatedCourse));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* listCourseSaga(action) {
  try {
    yield put({ type: adminCourseTypes.SET_LOADING });
    const addedAdmin = yield call(
      apiData,
      `${process.env.REACT_APP_ADD_ADMIN}`,
      action.payload,
      'GET'
    );
    yield put(listCourse({ message: addedAdmin.message }));
  } catch (error) {
    yield put(setErrors(error));
  }
}
