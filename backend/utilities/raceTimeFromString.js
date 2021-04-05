module.exports = {
  raceTimeFromString: (string) => {
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
