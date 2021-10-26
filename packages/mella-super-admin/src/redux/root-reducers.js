import { combineReducers } from 'redux';
import { authReducer } from './auth/auth-reducer';
import { errorReducer } from './error/error-reducer';
import userReducer from './users/user-reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  errors: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
