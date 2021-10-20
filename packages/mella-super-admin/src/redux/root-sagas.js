import { all, takeLatest } from 'redux-saga/effects';

import {
  addSuperAdminSaga,
  deleteSuperAdminSaga,
  getSuperAdminSaga,
  loginSuperAdminSaga,
  searchSuperAdminByEmailSaga,
  searchSuperAdminByNameSaga,
} from './users/user-sagas';
import { userActionTypes } from './users/users-types';

function* rootSaga() {
  yield all([
    // users
    takeLatest(userActionTypes.LOGING_USER, loginSuperAdminSaga),
    takeLatest(userActionTypes.ADDING_ADMIN, addSuperAdminSaga),
    takeLatest(userActionTypes.GETING_ADMIN, getSuperAdminSaga),
    takeLatest(userActionTypes.DELETING_ADMIN, deleteSuperAdminSaga),
    takeLatest(userActionTypes.SEARCHING_BY_NAME, searchSuperAdminByNameSaga),
    takeLatest(userActionTypes.SEARCHING_BY_EMAIL, searchSuperAdminByEmailSaga),
  ]);
}

export default rootSaga;
