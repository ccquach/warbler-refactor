export const getFilteredDataByUser = (messages, username) => {
  return messages.filter(m => m.user.username === username);
};
