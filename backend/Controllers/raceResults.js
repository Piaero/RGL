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

router.get('/race-results', (req, res) => {
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

  const setRaceResults = (results) => {
    let raceFormats = Object.keys(results.calendar.raceFormat);
    let selectedRace = results.calendar.races[0];

    selectedRace.adjustedResults = {};

    for (const raceSession of raceFormats) {
      let sessionResults = selectedRace.results[raceSession];

      selectedRace.adjustedResults[raceSession] = [];

      let absoluteTimeString = sessionResults[1].eventTime;

      for (const driver in sessionResults) {
        if (driver == 1) {
          let driversTimeInMilliseconds = timeConvert.raceTimeFromString(
            absoluteTimeString
          );

          sessionResults[driver].adjustedEventTime = adjustPenalties(
            driversTimeInMilliseconds,
            sessionResults[driver].juryPenalties
          );
        } else {
          let driversAbsoluteTime = timeConvert.sumTwoTimeStrings(
            sessionResults[driver].eventTime,
            absoluteTimeString
          );

          sessionResults[driver].adjustedEventTime = adjustPenalties(
            driversAbsoluteTime,
            sessionResults[driver].juryPenalties
          );
        }
        selectedRace.adjustedResults[raceSession].push(sessionResults[driver]);
      }

      sortDriversByEventTime(selectedRace.adjustedResults[raceSession]);
    }
  };

  const getDrivers = async () => {
    let drivers;
    await client
      .db('RGL')
      .collection('divisions')
      .find({
        division: req.query.division,
      })
      .project({ 'calendar.drivers': 1 })
      .toArray()
      .then((results) => {
        drivers = results;
      });
    return drivers[0];
  };

  client
    .db('RGL')
    .collection('divisions')
    .find({
      'calendar.races.country': req.query.country,
      division: req.query.division,
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
      if (results[0].calendar.races[0].results === null) {
        return results[0];
      }

      setRaceResults(results[0]);

      formatAllTimesToTimeString(results[0]);

      return results[0];
    })
    .then(async (results) => {
      let drivers = await getDrivers();
      console.log(JSON.stringify(drivers, null, 2));
      return results;
    })

    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
