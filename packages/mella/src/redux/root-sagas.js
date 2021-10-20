import { all, takeLatest } from 'redux-saga/effects';
import {
  addEndUserCommentSaga,
  deleteEndUserCommentSaga,
  getEndUserCommentsSaga,
  loginEndUserSaga,
  loginFacebookSaga,
  loginGoogleSaga,
  logoutEndUserSaga,
  registerEndUserSaga,
  updateEndUserLikeSaga,
} from './user/user-sagas';
import {
  getEndUserQuizSaga,
  updateEndUserSelectedQuizSaga,
} from './main-content/main-content-sagas';
import { getEndUserItemsSaga } from './side-bar/side-bar-sagas';

// action types
import { maincontentTypes } from './main-content/main-content-types';
import { sidebarTypes } from './side-bar/side-bar-types';
import { userTypes } from './user/user-types';

function* rootSaga() {
  yield all([
    // sidebar
    takeLatest(sidebarTypes.GETING_ITEMS, getEndUserItemsSaga),

    // main-content
    takeLatest(maincontentTypes.GETING_QUIZ, getEndUserQuizSaga),
    takeLatest(
      maincontentTypes.UPDATING_SELECTED_QUIZ,
      updateEndUserSelectedQuizSaga
    ),

    // user
    takeLatest(userTypes.LOGINING_USER, loginEndUserSaga),
    takeLatest(userTypes.FACEBOOK_LOGING, loginFacebookSaga),
    takeLatest(userTypes.GOOGLE_LOGING, loginGoogleSaga),
    takeLatest(userTypes.REGISTERING_USER, registerEndUserSaga),
    takeLatest(userTypes.LOGINGOUT_USER, logoutEndUserSaga),
    takeLatest(userTypes.ADDING_COMMENT, addEndUserCommentSaga),
    takeLatest(userTypes.GETING_COMMENTS, getEndUserCommentsSaga),
    takeLatest(userTypes.DELETING_COMMENT, deleteEndUserCommentSaga),
    takeLatest(userTypes.UPDATING_LIKE, updateEndUserLikeSaga),
  ]);
}

export default rootSaga;
