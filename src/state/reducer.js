import {combineReducers} from 'redux';

import collection from '../data/collection/state/reducer'

const rootReducer = combineReducers({
  data: combineReducers({
    collection,
  }),
});

export default rootReducer;