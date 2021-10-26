import { all, takeLatest } from 'redux-saga/effects';
import { loginEndUserSaga, logoutUserSaga } from './auth/auth-sagas';
import { authActionType } from './auth/auth-types';
import { deleteCommentSaga, getCommentsSaga } from './comment/comment-sagas';
import { commentActionType } from './comment/comment-type';
import {
  addQuizSaga,
  deleteQuizSaga,
  getQuizzesSaga,
  updateQuizSaga,
} from './quizzes/quizzes-sagas';
import { quizzesActionTypes } from './quizzes/quizzes-type';

import {
  addUserSaga,
  getUsersSaga,
  // loginEndUserSaga,
  // logoutUserSaga,
  removeUserSaga,
  searchByEmailSaga,
  searchByIdSaga,
  updatePasswordSaga,
  updateUserSaga,
} from './users/user-sagas';
import { userActionTypes } from './users/users-types';

function* rootSaga() {
  yield all([
    // auth
    takeLatest(authActionType.LOGING_USER, loginEndUserSaga),
    takeLatest(authActionType.LOGING_OUT_USER, logoutUserSaga),

    // users
    takeLatest(userActionTypes.GET_USERS_REQUEST, getUsersSaga),
    takeLatest(userActionTypes.REMOVE_USER_REQUEST, removeUserSaga),
    takeLatest(userActionTypes.SEARCHING_BY_EMAIL, searchByEmailSaga),
    takeLatest(userActionTypes.SEARCHING_BY_ID, searchByIdSaga),
    takeLatest(userActionTypes.UPDATING_PASSWORD, updatePasswordSaga),
    takeLatest(userActionTypes.ADDING_USER, addUserSaga),
    takeLatest(userActionTypes.UPDATING_USER, updateUserSaga),

    // comment
    takeLatest(commentActionType.GETING_COMMENT, getCommentsSaga),
    takeLatest(commentActionType.DELETING_COMMENT, deleteCommentSaga),

    // quiz
    takeLatest(quizzesActionTypes.GETING_QUIZ, getQuizzesSaga),
    takeLatest(quizzesActionTypes.ADDING_QUIZ, addQuizSaga),
    takeLatest(quizzesActionTypes.DELETING_QUIZ, deleteQuizSaga),
    takeLatest(quizzesActionTypes.UPDATING_QUIZ, updateQuizSaga),
  ]);
}

export default rootSaga;
