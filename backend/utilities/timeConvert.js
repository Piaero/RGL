module.exports = {
  timeStringFromDateObject: (dateObject) => {
    let hours = dateObject.getHours();

    let minutes;
    if (hours) {
      dateObject.getMinutes() >= 10
        ? (minutes = dateObject.getMinutes())
        : (minutes = `0${dateObject.getMinutes()}`);
    } else {
      minutes = dateObject.getMinutes();
    }

    let seconds;
    if (minutes) {
      dateObject.getSeconds() >= 10
        ? (seconds = dateObject.getSeconds())
        : (seconds = `0${dateObject.getSeconds()}`);
    } else {
      seconds = dateObject.getSeconds();
    }

    let milliseconds;
    if (dateObject.getMilliseconds() >= 100) {
      milliseconds = dateObject.getMilliseconds();
    } else if (dateObject.getMilliseconds() >= 10) {
      milliseconds = `0${dateObject.getMilliseconds()}`;
    } else {
      milliseconds = `00${dateObject.getMilliseconds()}`;
    }

    let timeString = '';

    hours ? (timeString = hours + ':') : null;

    minutes ? (timeString = timeString + minutes + ':') : null;

    seconds
      ? (timeString = timeString + seconds + '.')
      : (timeString = timeString + '0.');

    milliseconds ? (timeString = timeString + milliseconds) : '? gap';

    return timeString;
  },

  raceTimeObjectFromString: (string) => {
    const regExp = /lap/gi;

    if (regExp.test(string)) {
      return string;
    } else {
      let timeArray = string.split(/[\D,]+/);

      let timeObject = {
        milliseconds: parseInt(timeArray[timeArray.length - 1]),
        seconds:
          timeArray[timeArray.length - 2] === undefined
            ? 0
            : parseInt(timeArray[timeArray.length - 2]),
        minutes:
          timeArray[timeArray.length - 3] === undefined
            ? 0
            : parseInt(timeArray[timeArray.length - 3]),
      };

      let dateObject = new Date(
        1970,
        0,
        1,
        0,
        timeObject.minutes,
        timeObject.seconds,
        timeObject.milliseconds
      );
      return dateObject;
    }
  },
  sumTwoTimeStrings: (driverGapString, referenceTimeString) => {
    const regExp = /lap/gi;

    if (regExp.test(driverGapString)) {
      return driverGapString;
    } else {
      let firstTimeArray = driverGapString.split(/[\D,]+/);

      let firstTimeObject = {
        milliseconds: parseInt(firstTimeArray[firstTimeArray.length - 1]),
        seconds:
          firstTimeArray[firstTimeArray.length - 2] === undefined
            ? 0
            : parseInt(firstTimeArray[firstTimeArray.length - 2]),
        minutes:
          firstTimeArray[firstTimeArray.length - 3] === undefined
            ? 0
            : parseInt(firstTimeArray[firstTimeArray.length - 3]),
      };

      let referenceTimeArray = referenceTimeString.split(/[\D,]+/);

      let referenceTimeObject = {
        milliseconds: parseInt(
          referenceTimeArray[referenceTimeArray.length - 1]
        ),
        seconds:
          referenceTimeArray[referenceTimeArray.length - 2] === undefined
            ? 0
            : parseInt(referenceTimeArray[referenceTimeArray.length - 2]),
        minutes:
          referenceTimeArray[referenceTimeArray.length - 3] === undefined
            ? 0
            : parseInt(referenceTimeArray[referenceTimeArray.length - 3]),
      };

      let dateObject = new Date(
        1970,
        0,
        1,
        0,
        firstTimeObject.minutes + referenceTimeObject.minutes,
        firstTimeObject.seconds + referenceTimeObject.seconds,
        firstTimeObject.milliseconds + referenceTimeObject.milliseconds
      );

      return dateObject;
    }
  },
};
