import { all, takeLatest } from 'redux-saga/effects';
import { loginSuperAdminSaga, logoutSuperAdminSaga } from './auth/auth-sagas';
import { authActionType } from './auth/auth-types';

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
  ]);
}

export default rootSaga;
