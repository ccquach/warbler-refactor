import { SET_ACTIVE_PROFILE } from '../actionTypes';
import { apiCall } from '../../services/api';
import { addFlash } from './flash';
import { setLoadingState } from './loading';

export const setActiveProfile = user => ({
  type: SET_ACTIVE_PROFILE,
  user
});

export const getActiveProfileUser = username => dispatch => {
  dispatch(setLoadingState(true));
  return new Promise((resolve, reject) => {
    return apiCall('get', `/api/users/${username}`)
      .then(res => {
        dispatch(setLoadingState(false));
        dispatch(setActiveProfile(res));
        resolve();
      })
      .catch(err => {
        dispatch(setLoadingState(false));
        dispatch(addFlash('danger', err.message));
        reject();
      });
  });
};
