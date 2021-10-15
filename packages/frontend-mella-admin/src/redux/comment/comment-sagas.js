import { call, put } from 'redux-saga/effects';
import { apiData, URL } from '../api/api';
import { setErrors } from '../error/error-actions';
import { deleteComment, getComment } from './comment-action';
import { commentActionType } from './comment-type';

export function* getCommentsSaga(action) {
  try {
    yield put({ type: commentActionType.SET_COMMENT_LOADING });
    const comments = yield call(
      apiData,
      `${URL.BASE_URL}/comments/${action.payload}`,
      null,
      'GET'
    );

    yield put(getComment(comments));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteCommentSaga(action) {
  try {
    yield put({ type: commentActionType.SET_COMMENT_LOADING });
    const commentId = yield call(
      apiData,
      `${URL.BASE_URL}/comment/${action.payload}`,
      null,
      'DELETE'
    );

    yield put(deleteComment(commentId));
  } catch (error) {
    yield put(setErrors(error));
  }
}
