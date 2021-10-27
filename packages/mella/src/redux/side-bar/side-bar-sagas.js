import { call, put } from 'redux-saga/effects';
import { apiData } from '../api/api';
import { setErrors } from '../error/error-actions';
import { getItems } from './side-bar-actions';

export function* getEndUserItemsSaga() {
  try {
    const items = yield call(
      apiData,
      `${process.env.REACT_APP_GET_OUTLINE}`,
      null,
      'GET'
    );

    const newMap = {};

    items.map(
      item =>
        item.Children.length > 0 &&
        item.Children.map(child => (newMap[child.name] = child.id))
    );

    yield put(getItems({ items, newMap }));
  } catch (error) {
    
    yield put(setErrors(error));
  }
}
