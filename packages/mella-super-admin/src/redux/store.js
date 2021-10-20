import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducers';

// redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-sagas';

//
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

sagaMiddleware.run(rootSaga);

export default store;
