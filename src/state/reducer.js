import {combineReducers} from 'redux';

import collection from '../data/collection/state/reducer'
import addNewItemForm from './reducers/addNewItemForm'

const rootReducer = combineReducers({
  data: combineReducers({
    collection,
  }),
  addNewItemForm,
});

export default rootReducer;