import {combineReducers} from 'redux';

import session from './reducers/session'
import sessionConfig from './reducers/sessionConfig'

const rootReducer = combineReducers({
  sessionConfig,
  session,
});

export default rootReducer;