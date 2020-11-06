
import { combineReducers } from 'redux';

import card from './cardReducer';
import create from './createReducer';

export default combineReducers({
  card,
  create,
});
