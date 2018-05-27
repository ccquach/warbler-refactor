import { SET_LOADING_STATE } from '../actionTypes';

export default (state = { isFetching: false }, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};
