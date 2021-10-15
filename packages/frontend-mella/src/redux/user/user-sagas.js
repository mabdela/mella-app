import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import {
  addComment,
  deleteComment,
  getComments,
  loginUser,
  logoutUser,
  registerUser,
  updateLike,
} from './user-action';

export function* registerEndUserSaga(action) {
  try {
    const registerUserData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/signup`,
      `${process.env.REACT_APP_SIGN_UP}`,
      action.payload.formData,
      'POST'
    );

    yield put(registerUser(registerUserData));
    yield action.payload.history.push('/');
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* loginEndUserSaga(action) {
  try {
    const loginUserData = yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/login`,
      `${process.env.REACT_APP_LOG_IN}`,
      action.payload,
      'POST'
    );
    yield put(loginUser(loginUserData));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* logoutEndUserSaga() {
  try {
    yield call(
      apiData,
      // `${URL.BASE_URL}/api/public/logout`,
      `${process.env.REACT_APP_LOG_OUT}`,
      null,
      'POST'
    );
    yield put(logoutUser());
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* addEndUserCommentSaga(action) {
  try {
    const comment = yield call(
      apiData,
      // `${URL.BASE_URL}/comment`,
      `${process.env.REACT_APP_ADD_COMMENT}`,
      action.payload,
      'POST'
    );
    yield put(addComment(comment));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* getEndUserCommentsSaga(action) {
  try {
    const comments = yield call(
      apiData,
      // `${URL.BASE_URL}/comments/${action.payload}`,
      `${process.env.REACT_APP_GET_COMMENT_BY_COMMENT_ID}/${action.payload}`,
      null,
      'GET'
    );
    yield put(getComments(comments));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteEndUserCommentSaga(action) {
  try {
    const comments = yield call(
      apiData,
      // `${URL.BASE_URL}/comment/${action.payload}`,
      `${process.env.REACT_APP_DELETE_COMMENT_BY_COMMENT_ID}/${action.payload}`,
      null,
      'DELETE'
    );
    yield put(deleteComment(comments));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updateEndUserLikeSaga(action) {
  try {
    const likeData = yield call(
      apiData,
      // `${URL.BASE_URL}/updatelike`,
      `${process.env.REACT_APP_UPDATE_LIKE}`,
      action.payload,
      'POST'
    );
    const commentId = action.payload.commentId;
    yield put(updateLike({ commentId, likes: likeData }));
  } catch (error) {
    yield put(setErrors(error));
  }
}
