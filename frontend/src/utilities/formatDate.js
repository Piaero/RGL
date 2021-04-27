export const formatDate = {
  dateHour: (fullDate) => {
    var today = new Date(fullDate);

    var date =
      today.getDate() +
      '.' +
      (today.getMonth() + 1) +
      '.' +
      today.getFullYear();

    var time = today.getHours() + ':' + today.getMinutes();

    var dateFormatted = date + ', ' + time;

    return dateFormatted;
  },

  date: (fullDate) => {
    var today = new Date(fullDate);

    var date =
      today.getDate() +
      '.' +
      `0${today.getMonth() + 1}`.slice(-2) +
      '.' +
      today.getFullYear();

    return date;
  },
};
