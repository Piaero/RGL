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
  const adjustPenalties = (originalTime, penaltySeconds) => {
    originalTime.setSeconds(originalTime.getSeconds() + penaltySeconds);
    return originalTime;
  };

  const formatRaceTime = (index, firstDriverTime, driverTime) => {
    if (index == 0) {
      return timeConvert.timeStringFromDateObject(firstDriverTime);
    } else {
      return timeConvert.timeStringFromDateObject(
        new Date(Date.parse(firstDriverTime) - Date.parse(driverTime))
      );
    }
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

        let referenceTimeString = sessionResultsToSort[1].eventTime;

        for (const driver in sessionResultsToSort) {
          let gapToReferenceTime = sessionResultsToSort[driver].eventTime;
          let calculatedEventTimeObject = timeConvert.sumTwoTimeStrings(
            gapToReferenceTime,
            referenceTimeString
          );

          if (driver == 1) {
            sessionResultsToSort[
              driver
            ].eventTime = timeConvert.raceTimeObjectFromString(
              referenceTimeString
            );

            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              timeConvert.raceTimeObjectFromString(referenceTimeString),
              sessionResultsToSort[driver].juryPenalties
            );
          } else {
            sessionResultsToSort[driver].eventTime = calculatedEventTimeObject;

            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              new Date(sessionResultsToSort[driver].eventTime),
              sessionResultsToSort[driver].juryPenalties
            );
          }
          results[0].calendar.races[0].adjustedResults[raceSession].push(
            sessionResultsToSort[driver]
          );
        }

        results[0].calendar.races[0].adjustedResults[raceSession].sort(
          (a, b) => {
            return (
              new Date(a.adjustedEventTime) - new Date(b.adjustedEventTime)
            );
          }
        );
      }

      return results[0];
    })
    .then((results) => {
      let raceFormats = Object.keys(results.calendar.raceFormat);
      // results[0].calendar.races[0].adjustedResults = {};

      for (const raceSession of raceFormats) {
        let firstDriverTime =
          results.calendar.races[0].adjustedResults[raceSession][0]
            .adjustedEventTime;

        for (
          let i = 0;
          i < results.calendar.races[0].adjustedResults[raceSession].length;
          i++
        ) {
          let driver =
            results.calendar.races[0].adjustedResults[raceSession][i];

          driver.adjustedEventTime = formatRaceTime(
            i,
            firstDriverTime,
            driver.adjustedEventTime
          );
        }

        // for (const [index, driver] of [
        //   results.calendar.races[0].adjustedResults[raceSession],
        // ].entries()) {
        //   // console.log(driver.adjustedEventTime.getHours());
        //   // driver.adjustedEventTime = driver.adjustedEventTime.getHours();
        // }
      }
      // console.log(JSON.stringify(results, null, 2));
      res.json(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
