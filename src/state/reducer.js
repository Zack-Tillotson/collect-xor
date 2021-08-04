import {combineReducers} from 'redux';

import collection from '../data/collection/state/reducer'
import form from './reducers/form'

const rootReducer = combineReducers({
  data: combineReducers({
    collection,
  }),
  form,
});

export default rootReducer;