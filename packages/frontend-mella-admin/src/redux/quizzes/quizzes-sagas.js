import { call, put } from 'redux-saga/effects';
import { apiData, URL } from '../api/api';
import { setErrors } from '../error/error-actions';
import { quizzesActionTypes } from './quizzes-type';
import { addQuiz, getQuiz } from './quizzes-actions';

export function* getQuizzesSaga(action) {
  try {
    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });
    const quizzes = yield call(
      apiData,
      `${URL.BASE_URL}/english/quiz/${action.payload}`,
      null,
      'GET'
    );

    yield put(getQuiz(quizzes));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* addQuizSaga(action) {
  try {
    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });
    const quizzes = yield call(
      apiData,
      `${URL.BASE_URL}/add_quiz`,
      action.payload,
      'POST'
    );

    yield put(addQuiz(quizzes));
  } catch (error) {
    yield put(setErrors(error));
  }
}
