import { ADD_FLASH, REMOVE_FLASH } from '../actionTypes';

const DEFAULT_STATE = {
  category: '',
  message: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FLASH:
      return {
        category: action.category,
        message: action.message
      };
    case REMOVE_FLASH:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
