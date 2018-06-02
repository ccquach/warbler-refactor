import { combineReducers } from 'redux';
import currentUser from './currentUser';
import activeProfile from './activeProfile';
import messages from './messages';
import flash from './flash';
import loading from './loading';

const rootReducer = combineReducers({
  currentUser,
  activeProfile,
  messages,
  flash,
  loading
});

export default rootReducer;
