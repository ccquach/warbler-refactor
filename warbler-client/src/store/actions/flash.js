import { ADD_FLASH, REMOVE_FLASH } from '../actionTypes';

export const addFlash = (category, message) => ({
  type: ADD_FLASH,
  category,
  message
});

export const removeFlash = () => ({
  type: REMOVE_FLASH
});
