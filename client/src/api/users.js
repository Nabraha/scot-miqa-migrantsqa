export const getUsersDataByUserId = id => {
  return fetch(`/api/users/${id}`).then(res => res.json());
};

export const changeProfilePic = ({ newPictureLink, userId }) => {
  return fetch("/api/users/change-profile-pic", {
    method: "PUT",
    body: JSON.stringify({ newPictureLink, userId }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
