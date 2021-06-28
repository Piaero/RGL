const timeConvert = require('../utilities/timeConvert.js');
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  const db = client.db('RGL');
  const countersCollection = db.collection('divisions');
});

module.exports = {
  formatResults: (race, raceFormat) => {
    const regExp = /[a-z]/i;

    const setRaceResults = (race, raceFormat) => {
      race.adjustedResults = {};

      for (const raceSession of Object.keys(raceFormat)) {
        let sessionResults = race.results[raceSession];

        race.adjustedResults[raceSession] = [];

        let absoluteTimeString = sessionResults[0].eventTime;

        for (const [index, driver] of sessionResults.entries()) {
          let penaltiesTime =
            driver.juryPenalties === null
              ? null
              : driver.juryPenalties.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue.seconds,
                  0
                );

          if (index == 0) {
            let driversTimeInMilliseconds =
              timeConvert.raceTimeFromString(absoluteTimeString);

            driver.adjustedEventTime = adjustPenalties(
              driversTimeInMilliseconds,
              penaltiesTime
            );

            driver.bestTimeInMilliseconds = timeConvert.raceTimeFromString(
              driver.bestTime
            );
          } else {
            let driversAbsoluteTime = timeConvert.sumTwoTimeStrings(
              driver.eventTime,
              absoluteTimeString
            );

            driver.adjustedEventTime = adjustPenalties(
              driversAbsoluteTime,
              penaltiesTime
            );

            driver.bestTimeInMilliseconds = timeConvert.raceTimeFromString(
              driver.bestTime
            );
          }
          race.adjustedResults[raceSession].push(driver);
        }
        sortDriversByEventTime(race.adjustedResults[raceSession]);
      }
    };

    const formatAllTimesToTimeString = (race, raceFormat) => {
      for (const raceSession of Object.keys(raceFormat)) {
        let firstDriverTime =
          race.adjustedResults[raceSession][0].adjustedEventTime;

        for (let i = 0; i < race.adjustedResults[raceSession].length; i++) {
          let driver = race.adjustedResults[raceSession][i];

          driver.adjustedEventTime = formatRaceTimeFromMilliseconds(
            i,
            firstDriverTime,
            driver.adjustedEventTime
          );
        }
      }
    };

    const setPoints = (race, raceFormat) => {
      for (const raceSession of Object.keys(raceFormat)) {
        let selectedSessionResults = race.adjustedResults[raceSession];
        let sessionPointsSystem = raceFormat[raceSession].pointsSystem;
        let topDriversForFastestLap =
          sessionPointsSystem.fastestLap?.pointsFromTop;
        let pointsForFastestLap = sessionPointsSystem.fastestLap?.points;

        let fastestInTheSession = selectedSessionResults
          .slice(0, topDriversForFastestLap)
          .sort((a, b) => {
            return a.bestTimeInMilliseconds - b.bestTimeInMilliseconds;
          })[0];

        for (const [index, driver] of selectedSessionResults.entries()) {
          driver.points = parseInt(sessionPointsSystem[index + 1])
            ? parseInt(sessionPointsSystem[index + 1])
            : null;
          if (pointsForFastestLap && driver.nick === fastestInTheSession.nick) {
            driver.points += pointsForFastestLap;
            driver.fastestLap = true;
          }
        }
      }
    };

    const adjustPenalties = (originalTime, penaltySeconds) => {
      if (regExp.test(originalTime)) {
        return originalTime;
      } else {
        return originalTime + penaltySeconds * 1000;
      }
    };

    const formatRaceTimeFromMilliseconds = (
      index,
      firstDriverTime,
      driverTime
    ) => {
      if (regExp.test(driverTime)) {
        return driverTime;
      } else if (index == 0) {
        return timeConvert.timeStringFromMilliseconds(firstDriverTime);
      } else {
        return (
          '+ ' +
          timeConvert.timeStringFromMilliseconds(driverTime - firstDriverTime)
        );
      }
    };

    const sortDriversByEventTime = (raceSession) => {
      raceSession.sort((a, b) => {
        return (
          regExp.test(a.adjustedEventTime) - regExp.test(b.adjustedEventTime) ||
          +(a.adjustedEventTime > b.adjustedEventTime) ||
          -(a.adjustedEventTime < b.adjustedEventTime)
        );
      });
    };

    const setQualifyingGaps = (race, raceFormat) => {
      for (const raceSession of Object.keys(raceFormat)) {
        if (raceSession === 'qualifying') {
          let qualifyingResults = race.results[raceSession];

          for (let i = 0; i < qualifyingResults.length; i++) {
            let selectedDriver = qualifyingResults[i];
            let leaderTime = qualifyingResults[0].bestTime;

            if (i === 0) {
              selectedDriver.adjustedEventTime = '-';
            } else {
              if (regExp.test(selectedDriver.bestTime)) {
                selectedDriver.adjustedEventTime = '-';
              } else {
                selectedDriver.adjustedEventTime =
                  '+ ' +
                  timeConvert.timeStringFromMilliseconds(
                    timeConvert.raceTimeFromString(selectedDriver.bestTime) -
                      timeConvert.raceTimeFromString(leaderTime)
                  );
              }
            }
          }
        } else {
          return null;
        }
      }
    };

    setRaceResults(race, raceFormat);

    formatAllTimesToTimeString(race, raceFormat);

    setPoints(race, raceFormat);

    setQualifyingGaps(race, raceFormat);

    return race;
  },
};
