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

      let absoluteTimeString = sessionResults[0].eventTime;

      for (const [index, driver] of sessionResults.entries()) {
        if (index == 0) {
          let driversTimeInMilliseconds = timeConvert.raceTimeFromString(
            absoluteTimeString
          );

          driver.adjustedEventTime = adjustPenalties(
            driversTimeInMilliseconds,
            driver.juryPenalties
          );
        } else {
          let driversAbsoluteTime = timeConvert.sumTwoTimeStrings(
            driver.eventTime,
            absoluteTimeString
          );

          driver.adjustedEventTime = adjustPenalties(
            driversAbsoluteTime,
            driver.juryPenalties
          );
        }
        selectedRace.adjustedResults[raceSession].push(driver);
      }
      sortDriversByEventTime(selectedRace.adjustedResults[raceSession]);
    }
  };

  const getDriversList = async () => {
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
        drivers = results[0].calendar.drivers;
      });
    return drivers;
  };

  const getTeamsList = async () => {
    let teams;
    await client
      .db('RGL')
      .collection('divisions')
      .find({
        division: req.query.division,
      })
      .project({ 'calendar.teams': 1 })
      .toArray()
      .then((results) => {
        teams = results[0].calendar.teams;
      });
    return teams;
  };

  const setDriversDetails = async (results) => {
    let driversList = await getDriversList();
    let raceFormats = Object.keys(results.calendar.raceFormat);

    for (const raceSession of raceFormats) {
      let selectedSessionResults =
        results.calendar.races[0].adjustedResults[raceSession];

      for (const [index, driver] of selectedSessionResults.entries()) {
        let selectedDriverNick = selectedSessionResults[index].nick;

        driver.fullName = driversList.find(
          (driver) => driver.nick === selectedDriverNick
        ).fullName;

        driver.number = driversList.find(
          (driver) => driver.nick === selectedDriverNick
        ).number;

        driver.team = driversList.find(
          (driver) => driver.nick === selectedDriverNick
        ).team;
      }
    }

    return results.calendar.races[0].adjustedResults;
  };

  const setTeamsDetails = async (results) => {
    let teamsList = await getTeamsList();
    let raceFormats = Object.keys(results.calendar.raceFormat);

    for (const raceSession of raceFormats) {
      let selectedSessionResults =
        results.calendar.races[0].adjustedResults[raceSession];

      for (const [index, driver] of selectedSessionResults.entries()) {
        let selectedDriverTeam = selectedSessionResults[index].team;

        driver.teamFullName = teamsList.find(
          (team) => team.name === selectedDriverTeam
        ).fullName;

        driver.teamLogo = teamsList.find(
          (team) => team.name === selectedDriverTeam
        ).logoUrl;

        driver.teamColour = teamsList.find(
          (team) => team.name === selectedDriverTeam
        ).colour;
      }
    }

    return results.calendar.races[0].adjustedResults;
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
      results.calendar.races[0].adjustedResults = await setDriversDetails(
        results
      );

      results.calendar.races[0].adjustedResults = await setTeamsDetails(
        results
      );

      res.json(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
