import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addFlash } from './flash';
import { setLoadingState } from './loading';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const setAuthorizationToken = token => {
  setTokenHeader(token);
};

export const logout = () => dispatch => {
  localStorage.clear();
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export const authUser = (type, userData) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  dispatch(setLoadingState(true));
  return new Promise((resolve, reject) => {
    return apiCall(
      type === 'updateUser' ? 'put' : 'post',
      type === 'updateUser' ? `/api/auth/${id}` : `/api/auth/${type}`,
      userData
    )
      .then(({ token, ...user }) => {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setLoadingState(false));
        dispatch(setCurrentUser(user));
        dispatch(
          addFlash('success', type === 'updateUser' ? 'Settings saved!' : null)
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

export const updatePassword = passwordData => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  dispatch(setLoadingState(true));
  return apiCall('put', `/api/auth/${id}/password`, passwordData)
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
