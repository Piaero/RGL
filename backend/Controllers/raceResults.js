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
      // jeżeli czas już jest formatem date (bo np. został wprowadzony z frontendu), to nie trzeba przerabiać stringa na datę

      // console.log(
      //   timeConvert.sumTwoTimeStrings('20:13.282', '5.856').toString()
      // );

      let resultsToSort = results[0].pages.calendar.races[0].results;
      let raceFormat = results[0].pages.calendar.raceFormat;

      let qualifyingResultsToSort =
        results[0].pages.calendar.races[0].results.qualifyingSprint;

      let qualifyingResultsTimesAdjusted = [];

      let referenceTimeString = qualifyingResultsToSort[1].eventTime;

      for (const driver in qualifyingResultsToSort) {
        let gapToReferenceTime = qualifyingResultsToSort[driver].eventTime;
        let calculatedEventTimeObject = timeConvert.sumTwoTimeStrings(
          gapToReferenceTime,
          referenceTimeString
        );

        if (driver == 1) {
          qualifyingResultsToSort[
            driver
          ].eventTime = timeConvert.raceTimeFromString(referenceTimeString);

          qualifyingResultsToSort[driver].adjustedEventTime = adjustPenalties(
            timeConvert.raceTimeFromString(referenceTimeString),
            qualifyingResultsToSort[driver].juryPenalties
          );
        } else {
          qualifyingResultsToSort[driver].eventTime = calculatedEventTimeObject;

          qualifyingResultsToSort[driver].adjustedEventTime = adjustPenalties(
            new Date(qualifyingResultsToSort[driver].eventTime),
            qualifyingResultsToSort[driver].juryPenalties
          );
        }

        qualifyingResultsTimesAdjusted.push(qualifyingResultsToSort[driver]);
      }

      qualifyingResultsTimesAdjusted.sort((a, b) => {
        return new Date(a.adjustedEventTime) - new Date(b.adjustedEventTime);
      });

      results[0].adjustedResults = qualifyingResultsTimesAdjusted;
      return results;
    })
    .then((d) => {
      // console.log(d);
      res.json(d[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
