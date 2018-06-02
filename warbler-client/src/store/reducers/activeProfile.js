import { SET_ACTIVE_PROFILE } from '../actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_PROFILE:
      return { ...action.user };
    default:
      return state;
  }
};
