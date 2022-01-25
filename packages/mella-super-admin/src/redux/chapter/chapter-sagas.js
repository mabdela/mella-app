import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { createChapter, chapterList, deleteChapter } from './chapter-action';
import { chapterTypes } from './chapter-types';

export function* createChapterSaga(action) {
  try {
    yield put({ type: chapterTypes.SET_LOADING });
    const createdChapter = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_CREATE_CHAPTER}`,
      action.payload,
      'POST'
    );

    yield put(createChapter(createdChapter.data.message));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* chapterListSaga(action) {
  try {
    yield put({ type: chapterTypes.SET_LOADING });
    const chapterData = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_CHAPTER_LIST}?course_id=${action.payload.course_id}`,
      null,
      'GET'
    );

    console.log('chapter: ', chapterData);

    yield put(chapterList(chapterData.chapters));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* chapterDeleteSaga(action) {
  try {
    yield put({ type: chapterTypes.SET_LOADING });
    const chapterData = yield call(
      apiData,
      `${process.env.REACT_APP_ADMIN_DELETE_CHAPTER}?id=${action.payload}`,
      null,
      'DELETE'
    );

    yield put(
      deleteChapter({ id: chapterData.chapter_id, msg: chapterData.msg })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}
