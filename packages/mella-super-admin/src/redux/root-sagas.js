import { all, takeLatest } from 'redux-saga/effects';
import { loginSuperAdminSaga, logoutSuperAdminSaga } from './auth/auth-sagas';
import { authActionType } from './auth/auth-types';
import {
  createCourseSaga,
  deleteCourseSaga,
  listCourseSaga,
  updateCourseSaga,
} from './course/course-sagas';
import { adminCourseTypes } from './course/course-types';

import {
  addSuperAdminSaga,
  deleteSuperAdminSaga,
  getSuperAdminSaga,
  searchSuperAdminByEmailSaga,
  searchSuperAdminByNameSaga,
} from './users/user-sagas';
import { userActionTypes } from './users/users-types';

function* rootSaga() {
  yield all([
    //auth
    takeLatest(authActionType.LOGING_USER, loginSuperAdminSaga),
    takeLatest(authActionType.LOGING_OUT_USER, logoutSuperAdminSaga),

    // users
    takeLatest(userActionTypes.ADDING_ADMIN, addSuperAdminSaga),
    takeLatest(userActionTypes.GETING_ADMIN, getSuperAdminSaga),
    takeLatest(userActionTypes.DELETING_ADMIN, deleteSuperAdminSaga),
    takeLatest(userActionTypes.SEARCHING_BY_NAME, searchSuperAdminByNameSaga),
    takeLatest(userActionTypes.SEARCHING_BY_EMAIL, searchSuperAdminByEmailSaga),

    // courses
    takeLatest(adminCourseTypes.CREATING_COURSE, createCourseSaga),
    takeLatest(adminCourseTypes.DELETING_COURSE, deleteCourseSaga),
    takeLatest(adminCourseTypes.UPDATING_COURSE, updateCourseSaga),
    takeLatest(adminCourseTypes.LISTING_COURSE, listCourseSaga),
  ]);
}

export default rootSaga;
