import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { listCorses } from './course-action';

export function* listCoursesEndUserSaga() {
  try {
    const courseData = yield call(
      apiData,
      `${process.env.REACT_APP_LIST_COURSES}`,
      null,
      'GET'
    );
    yield put(listCorses(courseData));
  } catch (error) {
    yield put(setErrors(error));
  }
}
