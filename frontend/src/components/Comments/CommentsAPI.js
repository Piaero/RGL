export const CommentsAPI = {
  getDivisions: () => {
    return fetch('/divisions')
      .then((res) => res.json())
      .catch(function (error) {
        console.log('Error fetching divisions', error);
      });
  },
};
