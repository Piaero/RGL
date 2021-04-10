var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

var timeConvert = require('../utilities/timeConvert.js');

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

router.post('/race-results', (req, res) => {
  const regExp = /[a-z]/gi;

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
        '+' +
        timeConvert.timeStringFromMilliseconds(driverTime - firstDriverTime)
      );
    }
  };

  const formatAllTimesToTimeString = (results) => {
    let raceFormats = Object.keys(results.calendar.raceFormat);

    for (const raceSession of raceFormats) {
      let firstDriverTime =
        results.calendar.races[0].adjustedResults[raceSession][0]
          .adjustedEventTime;

      for (
        let i = 0;
        i < results.calendar.races[0].adjustedResults[raceSession].length;
        i++
      ) {
        let driver = results.calendar.races[0].adjustedResults[raceSession][i];

        driver.adjustedEventTime = formatRaceTimeFromMilliseconds(
          i,
          firstDriverTime,
          driver.adjustedEventTime
        );
      }
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

  client
    .db('RGL')
    .collection('divisions')
    .find({
      'calendar.races.country': req.body.resultsDetails.country,
      division: req.body.resultsDetails.division,
    })
    .collation({ locale: 'en', strength: 1 })
    .project({
      'calendar.seasonName': 1,
      'calendar.raceFormat': 1,
      'calendar.races.venue': 1,
      'calendar.races.date': 1,
      'calendar.races.date': 1,
      'calendar.races.results.$': 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      let raceFormats = Object.keys(results[0].calendar.raceFormat);
      results[0].calendar.races[0].adjustedResults = {};

      for (const raceSession of raceFormats) {
        let sessionResultsToSort =
          results[0].calendar.races[0].results[raceSession];

        results[0].calendar.races[0].adjustedResults[raceSession] = [];

        let absoluteTimeString = sessionResultsToSort[1].eventTime;

        for (const driver in sessionResultsToSort) {
          let gapToWinnersTime = sessionResultsToSort[driver].eventTime;
          let driversAbsoluteTime = timeConvert.sumTwoTimeStrings(
            gapToWinnersTime,
            absoluteTimeString
          );
          let driversTimeInMilliseconds =
            sessionResultsToSort[driver].eventTimeInMilliseconds;

          if (driver == 1) {
            driversTimeInMilliseconds = timeConvert.raceTimeFromString(
              absoluteTimeString
            );

            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              driversTimeInMilliseconds,
              sessionResultsToSort[driver].juryPenalties
            );
          } else {
            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              driversAbsoluteTime,
              sessionResultsToSort[driver].juryPenalties
            );
          }
          results[0].calendar.races[0].adjustedResults[raceSession].push(
            sessionResultsToSort[driver]
          );
        }

        sortDriversByEventTime(
          results[0].calendar.races[0].adjustedResults[raceSession]
        );
      }

      formatAllTimesToTimeString(results[0]);

      return results[0];
    })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
