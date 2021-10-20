import { all, takeLatest } from 'redux-saga/effects';
import { deleteCommentSaga, getCommentsSaga } from './comment/comment-sagas';
import { commentActionType } from './comment/comment-type';
import {
  addQuizSaga,
  deleteQuizSaga,
  getQuizzesSaga,
} from './quizzes/quizzes-sagas';
import { quizzesActionTypes } from './quizzes/quizzes-type';

import {
  getUsersSaga,
  loginEndUserSaga,
  removeUserSaga,
  searchByEmailSaga,
  searchByIdSaga,
  updatePasswordSaga,
} from './users/user-sagas';
import { userActionTypes } from './users/users-types';

function* rootSaga() {
  yield all([
    // users
    takeLatest(userActionTypes.LOGING_USER, loginEndUserSaga),
    takeLatest(userActionTypes.GET_USERS_REQUEST, getUsersSaga),
    takeLatest(userActionTypes.REMOVE_USER_REQUEST, removeUserSaga),
    takeLatest(userActionTypes.SEARCHING_BY_EMAIL, searchByEmailSaga),
    takeLatest(userActionTypes.SEARCHING_BY_ID, searchByIdSaga),
    takeLatest(userActionTypes.UPDATING_PASSWORD, updatePasswordSaga),

    // comment
    takeLatest(commentActionType.GETING_COMMENT, getCommentsSaga),
    takeLatest(commentActionType.DELETING_COMMENT, deleteCommentSaga),

    // quiz
    takeLatest(quizzesActionTypes.GETING_QUIZ, getQuizzesSaga),
    takeLatest(quizzesActionTypes.ADDING_QUIZ, addQuizSaga),
    takeLatest(quizzesActionTypes.DELETING_QUIZ, deleteQuizSaga),
  ]);
}

export default rootSaga;
