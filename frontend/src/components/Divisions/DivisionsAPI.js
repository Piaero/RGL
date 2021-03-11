export const DivisionsAPI = {
  fetchDivisions: () => {
    return fetch("/divisions")
      .then((res) => res.json())
      .catch(function (error) {
        console.log("Error fetching divisions", error);
      });
  },
};
