import { combineReducers } from 'redux';
import currentUser from './currentUser';
import messages from './messages';
import flash from './flash';
import loading from './loading';

const rootReducer = combineReducers({
  currentUser,
  messages,
  flash,
  loading
});

export default rootReducer;
