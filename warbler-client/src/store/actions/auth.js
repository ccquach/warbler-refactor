import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

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
    return new Promise((resolve, reject) => {
      return apiCall(
        type === 'updateUser' ? 'put' : 'post',
        type === 'updateUser' ? `/api/auth/${userId}` : `/api/auth/${type}`,
        userData
      )
        .then(({ token, ...user }) => {
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function updatePassword(passwordData, userId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall('put', `/api/auth/${userId}/password`, passwordData)
        .then(res => {
          dispatch(
            addError('Password updated! Use new password on next log in.')
          );
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
