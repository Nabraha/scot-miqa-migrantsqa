export const getUsersDataByUserId = id => {
  return fetch(`/api/users/${id}`).then(res => res.json());
};
