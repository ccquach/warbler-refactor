import { combineReducers } from 'redux';
import currentUser from './currentUser';
import messages from './messages';
import flash from './flash';

const rootReducer = combineReducers({
  currentUser,
  messages,
  flash
});

export default rootReducer;
