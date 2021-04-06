var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

var timeConvert = require('../utilities/raceTimeFromString.js');

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
  const convertIntervalsToEventTime = (winnersTime, usersTime) => {
    return;
  };

  const adjustPenalties = (originalTime, penaltySeconds) => {
    originalTime.setSeconds(originalTime.getSeconds() + penaltySeconds);
    return originalTime;
  };

  client
    .db('RGL')
    .collection('divisions')
    .find({
      'pages.calendar.races.country': req.body.resultsDetails.country,
      division: req.body.resultsDetails.division,
    })
    .collation({ locale: 'en', strength: 1 })
    .project({
      'pages.calendar.seasonName': 1,
      'pages.calendar.raceFormat': 1,
      'pages.calendar.races.venue': 1,
      'pages.calendar.races.date': 1,
      'pages.calendar.races.date': 1,
      'pages.calendar.races.results.$': 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      let raceFormats = Object.keys(results[0].pages.calendar.raceFormat);
      results[0].pages.calendar.races[0].adjustedResults = {};

      for (const raceSession of raceFormats) {
        let sessionResultsToSort =
          results[0].pages.calendar.races[0].results[raceSession];

        results[0].pages.calendar.races[0].adjustedResults[raceSession] = [];

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
            ].eventTime = timeConvert.raceTimeFromString(referenceTimeString);

            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              timeConvert.raceTimeFromString(referenceTimeString),
              sessionResultsToSort[driver].juryPenalties
            );
          } else {
            sessionResultsToSort[driver].eventTime = calculatedEventTimeObject;

            sessionResultsToSort[driver].adjustedEventTime = adjustPenalties(
              new Date(sessionResultsToSort[driver].eventTime),
              sessionResultsToSort[driver].juryPenalties
            );
          }
          results[0].pages.calendar.races[0].adjustedResults[raceSession].push(
            sessionResultsToSort[driver]
          );
        }

        results[0].pages.calendar.races[0].adjustedResults[raceSession].sort(
          (a, b) => {
            return (
              new Date(a.adjustedEventTime) - new Date(b.adjustedEventTime)
            );
          }
        );
      }

      return results;
    })
    .then((d) => {
      // console.log(d);
      res.json(d[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
