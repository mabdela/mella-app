import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { deleteComment, getComment } from './comment-action';
import { commentActionType } from './comment-type';

export function* getCommentsSaga(action) {
  try {
    yield put({ type: commentActionType.SET_COMMENT_LOADING });
    const comments = yield call(
      apiData,
      `${process.env.REACT_APP_GET_COMMENTS_BY_TOPIC_ID}/${action.payload}`,
      null,
      'GET'
    );

    yield put(
      getComment(
        comments === null
          ? { comment: comments, message: 'No Comment Found!' }
          : { comment: comments, message: null }
      )
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteCommentSaga(action) {
  try {
    yield put({ type: commentActionType.SET_COMMENT_LOADING });
    const commentId = yield call(
      apiData,
      `${process.env.REACT_APP_DELETE_COMMENT_BY_COMMENT_ID}/${action.payload}`,
      null,
      'DELETE'
    );

    yield put(
      deleteComment({
        comment_id: commentId.comment_id,
        message: 'Comment Deleted Successfully!',
      })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}
