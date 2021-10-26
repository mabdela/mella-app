import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { quizzesActionTypes } from './quizzes-type';
import { addQuiz, deleteQuiz, getQuiz, updateQuiz } from './quizzes-actions';

export function* getQuizzesSaga(action) {
  try {
    const quizzes = yield call(
      apiData,
      `${process.env.REACT_APP_GET_QUIZ_BY_QUIZ_ID}/${action.payload}`,
      null,
      'GET'
    );

    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });

    yield put(getQuiz(quizzes));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* addQuizSaga(action) {
  try {
    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });
    yield call(
      apiData,
      `${process.env.REACT_APP_ADD_QUIZ}`,
      action.payload,
      'POST'
    );

    yield put(addQuiz({ message: 'Quiz Successfully added' }));
  } catch (error) {
    yield put(setErrors(error));
  }
}

export function* deleteQuizSaga(action) {
  try {
    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });
    console.log(action.payload);
    const quizzes = yield call(
      apiData,
      `${process.env.REACT_APP_DELETE_QUIZ}`,
      action.payload,
      'PUT'
    );

    console.log(quizzes);

    yield put(deleteQuiz(quizzes));
  } catch (error) {
    yield put(setErrors(error));
  }
}
export function* updateQuizSaga(action) {
  try {
    yield put({ type: quizzesActionTypes.SET_QUIZ_LOADING });
    const quizzes = yield call(
      apiData,
      `${process.env.REACT_APP_UPDATE_QUIZ}`,
      action.payload,
      'PUT'
    );

    yield put(
      updateQuiz({ quiz: quizzes, message: 'Quiz Successfully updated!' })
    );
  } catch (error) {
    yield put(setErrors(error));
  }
}
