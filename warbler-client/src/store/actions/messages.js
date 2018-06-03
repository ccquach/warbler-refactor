import { apiCall } from '../../services/api';
import { addFlash } from './flash';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';
import { setLoadingState } from './loading';

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => dispatch(addFlash('danger', err.message)));
  };
};

export const fetchMessages = () => {
  return dispatch => {
    dispatch(setLoadingState(true));
    return apiCall('get', '/api/messages')
      .then(res => {
        dispatch(setLoadingState(false));
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(setLoadingState(false));
        dispatch(addFlash('danger', err.message));
      });
  };
};

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user._id;
  dispatch(setLoadingState(true));
  return new Promise((resolve, reject) => {
    return apiCall('post', `/api/users/${id}/messages`, { text })
      .then(res => {
        dispatch(setLoadingState(false));
        resolve();
      })
      .catch(err => {
        dispatch(setLoadingState(false));
        dispatch(addFlash('danger', err.message));
        reject();
      });
  });
};
