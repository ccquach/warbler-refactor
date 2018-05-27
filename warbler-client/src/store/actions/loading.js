import { SET_LOADING_STATE } from '../actionTypes';

export const setLoadingState = isFetching => ({
  type: SET_LOADING_STATE,
  isFetching
});
