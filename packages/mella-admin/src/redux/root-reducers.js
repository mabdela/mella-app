import { combineReducers } from 'redux';
import { commentReducer } from './comment/comment-reducer';
import { errorReducer } from './error/error-reducer';
import { quizzesReducers } from './quizzes/quizzes-reducer';
import { userReducer } from './users/user-reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // local storage
import { authReducer } from './auth/auth-reducer';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  comments: commentReducer,
  quizzes: quizzesReducers,
  errors: errorReducer,
});

export default persistReducer(persistConfig, rootReducer);
