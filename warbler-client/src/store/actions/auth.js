import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addFlash } from './flash';
import { setLoadingState } from './loading';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function authUser(type, userData, userId) {
  return dispatch => {
    dispatch(setLoadingState(true));
    return new Promise((resolve, reject) => {
      return apiCall(
        type === 'updateUser' ? 'put' : 'post',
        type === 'updateUser' ? `/api/auth/${userId}` : `/api/auth/${type}`,
        userData
      )
        .then(({ token, ...user }) => {
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          dispatch(setLoadingState(false));
          dispatch(setCurrentUser(user));
          dispatch(
            addFlash(
              'success',
              type === 'updateUser' ? 'Settings saved!' : null
            )
          );
          resolve();
        })
        .catch(err => {
          dispatch(setLoadingState(false));
          dispatch(addFlash('danger', err.message));
          reject();
        });
    });
  };
}

export function updatePassword(passwordData, userId) {
  return dispatch => {
    dispatch(setLoadingState(true));
    return apiCall('put', `/api/auth/${userId}/password`, passwordData)
      .then(res => {
        dispatch(setLoadingState(false));
        dispatch(
          addFlash(
            'success',
            'Password updated! Use new password on next log in.'
          )
        );
      })
      .catch(err => {
        dispatch(setLoadingState(false));
        dispatch(addFlash('danger', err.message));
      });
  };
}
