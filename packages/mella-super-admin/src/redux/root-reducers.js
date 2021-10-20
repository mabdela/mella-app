import { combineReducers } from 'redux';
import { errorReducer } from './error/error-reducer';
import userReducer from './users/user-reducer';

const rootReducer = combineReducers({
  users: userReducer,
  errors: errorReducer,
});

export default rootReducer;
