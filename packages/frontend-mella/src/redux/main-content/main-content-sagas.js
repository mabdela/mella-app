import { call, put } from 'redux-saga/effects';
import { getQuiz, updateSelectedQuiz } from './main-content-actions';
import { apiData } from '../api/api';

import { setErrors } from '../error/error-actions';
import { maincontentTypes } from './main-content-types';

export function* getEndUserQuizSaga(action) {
  try {
    yield put({ type: maincontentTypes.QUIZ_LOADING });
    const quiz = yield call(
      apiData,
      // `${URL.BASE_URL}/english/quiz/${action.payload.topic_id}`,
      `${process.env.REACT_APP_QUIZ_BY_TOPIC_ID}/${action.payload.topic_id}`,
      null,
      'GET'
    );

    const selectedData = {
      user_id: action.payload.user_id,
      topic_id: action.payload.topic_id.toString(),
    };

    const selected = yield call(
      apiData,
      // `${URL.BASE_URL}/quiz_info`,
      `${process.env.REACT_APP_QUIZ_INFO}`,
      selectedData,
      'POST'
    );

    const questions = selected.questions;
    yield put(getQuiz({ quiz, questions }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* updateEndUserSelectedQuizSaga(action) {
  try {
    const quiz = yield call(
      apiData,
      // `${URL.BASE_URL}/update_quiz_info`,
      `${process.env.REACT_APP_UPDATE_QUIZ_INFO}`,
      action.payload,
      'POST'
    );

    yield put(updateSelectedQuiz(quiz.questions));
  } catch (error) {
    yield put(setErrors(error));
  }
}
