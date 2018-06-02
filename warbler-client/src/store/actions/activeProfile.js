import { SET_ACTIVE_PROFILE } from '../actionTypes';

export const setActiveProfile = user => ({
  type: SET_ACTIVE_PROFILE,
  user
});
