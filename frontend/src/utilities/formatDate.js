export const formatDate = {
  dateHour: (fullDate) => {
    var today = new Date(fullDate);

    var date =
      `0${today.getDate()}`.slice(-2) +
      '.' +
      `0${today.getMonth() + 1}`.slice(-2) +
      '.' +
      today.getFullYear();

    var time = today.getHours() + ':' + today.getMinutes();

    var dateFormatted = date + ', ' + time;

    return dateFormatted;
  },

  date: (fullDate) => {
    var today = new Date(fullDate);

    var date =
      `0${today.getDate()}`.slice(-2) +
      '.' +
      `0${today.getMonth() + 1}`.slice(-2) +
      '.' +
      today.getFullYear();

    return date;
  },
};
