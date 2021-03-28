export const formatDate = (fullDate) => {
  var today = new Date(fullDate);

  var date =
    today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

  var time = today.getHours() + ':' + today.getMinutes();

  var dateFormatted = date + ', ' + time;

  return dateFormatted;
};
