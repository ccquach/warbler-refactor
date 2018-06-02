export const getFilteredDataByUser = (messages, userId) => {
  return messages.filter(m => m.user._id === userId);
};
