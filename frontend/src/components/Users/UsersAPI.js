export const UsersAPI = {
  getUser: (id) => {
    return fetch(`/user?id=${id}`)
      .then((res) => res.json())
      .catch(function (error) {
        console.log('Error fetching user', error);
      });
  },
};
