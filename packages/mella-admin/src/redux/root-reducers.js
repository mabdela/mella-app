import { combineReducers } from 'redux';
import { commentReducer } from './comment/comment-reducer';
import { errorReducer } from './error/error-reducer';
import { quizzesReducers } from './quizzes/quizzes-reducer';
import { userReducer } from './users/user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  comments: commentReducer,
  quizzes: quizzesReducers,
  errors: errorReducer,
});

export default rootReducer;
