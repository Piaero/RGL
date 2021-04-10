module.exports = {
  timeStringFromMilliseconds: (time) => {
    let milliseconds = time % 1000;
    time = (time - milliseconds) / 1000;
    let seconds = time % 60;
    time = (time - seconds) / 60;
    let minutes = time % 60;
    let hours = (time - minutes) / 60;

    let timeString = '';

    hours ? (timeString = hours + ':') : null;

    if (hours) {
      minutes < 10
        ? (timeString = timeString + `0${minutes}:`)
        : (timeString += minutes + ':');
    } else if (minutes !== 0) {
      timeString += minutes + ':';
    }

    if (minutes) {
      seconds < 10
        ? (timeString = timeString + `0${seconds}`)
        : (timeString += seconds + '');
    } else if (seconds !== 0) {
      timeString += seconds + '';
    }

    if (seconds) {
      timeString += '.' + ('00' + milliseconds).slice(-3);
    } else if (timeString.length < 1) {
      timeString += '0.' + ('00' + milliseconds).slice(-3);
    } else {
      timeString += '.' + ('00' + milliseconds).slice(-3);
    }

    return timeString;
  },

  raceTimeFromString: (string) => {
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
      hours:
        timeArray[timeArray.length - 4] === undefined
          ? 0
          : parseInt(timeArray[timeArray.length - 4]),
    };

    let timeInMilliseconds =
      timeObject.hours * 60 * 60 * 1000 +
      timeObject.minutes * 60 * 1000 +
      timeObject.seconds * 1000 +
      timeObject.milliseconds;

    return timeInMilliseconds;
  },
  sumTwoTimeStrings: (driverGapString, referenceTimeString) => {
    const regExp = /[a-z]/gi;

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
        hours:
          firstTimeArray[firstTimeArray.length - 4] === undefined
            ? 0
            : parseInt(firstTimeArray[firstTimeArray.length - 4]),
      };

      let gapTimeArray = referenceTimeString.split(/[\D,]+/);

      let referenceTimeObject = {
        milliseconds: parseInt(gapTimeArray[gapTimeArray.length - 1]),
        seconds:
          gapTimeArray[gapTimeArray.length - 2] === undefined
            ? 0
            : parseInt(gapTimeArray[gapTimeArray.length - 2]),
        minutes:
          gapTimeArray[gapTimeArray.length - 3] === undefined
            ? 0
            : parseInt(gapTimeArray[gapTimeArray.length - 3]),
        hours:
          gapTimeArray[gapTimeArray.length - 4] === undefined
            ? 0
            : parseInt(gapTimeArray[gapTimeArray.length - 4]),
      };

      let timeInMilliseconds =
        firstTimeObject.milliseconds +
        referenceTimeObject.milliseconds +
        (firstTimeObject.seconds + referenceTimeObject.seconds) * 1000 +
        (firstTimeObject.minutes + referenceTimeObject.minutes) * 60 * 1000 +
        (firstTimeObject.hours + referenceTimeObject.hours) * 60 * 60 * 1000;

      return timeInMilliseconds;
    }
  },
};
