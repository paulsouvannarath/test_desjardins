const generateUserId = (users) => {
  const ids = users.map((user) => user.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export default generateUserId;
