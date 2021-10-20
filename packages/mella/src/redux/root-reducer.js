import { combineReducers } from 'redux';
import { errorReducer } from './error/error-reducer';
import { maincontentReducer } from './main-content/main-content-reducer';
import { sidebarReducer } from './side-bar/side-bar-reducer';
import { authReducer } from './user/user-reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth', 'sidebar'],
};

const rootReducer = combineReducers({
  // end-user
  sidebar: sidebarReducer,
  maincontent: maincontentReducer,
  auth: authReducer,
  error: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
