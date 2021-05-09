var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const formatResults = require('../utilities/formatResults.js');

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
  const setDriversDetails = (results) => {
    let driversList = results.calendar.drivers;
    let raceFormat = Object.keys(results.calendar.raceFormat);

    for (const raceSession of raceFormat) {
      let selectedSessionResults =
        results.calendar.races[0].adjustedResults[raceSession];

      for (const [index, driver] of selectedSessionResults.entries()) {
        let selectedDriverNick = selectedSessionResults[index].nick;
        selectedDriver = driversList.find(
          (driver) => driver.nick === selectedDriverNick
        );

        driver.fullName = selectedDriver.fullName;
        driver.number = selectedDriver.number;
        driver.team = selectedDriver.team;
      }
    }

    return results.calendar.races[0].adjustedResults;
  };

  const setTeamsDetails = (results) => {
    let teamsList = results.calendar.teams;
    let raceFormat = Object.keys(results.calendar.raceFormat);

    for (const raceSession of raceFormat) {
      let selectedSessionResults =
        results.calendar.races[0].adjustedResults[raceSession];

      for (const [index, driver] of selectedSessionResults.entries()) {
        let selectedDriverTeam = selectedSessionResults[index].team;
        let selectedTeam = teamsList.find(
          (team) => team.name === selectedDriverTeam
        );

        driver.teamFullName = selectedTeam.fullName;
        driver.teamLogo = selectedTeam.logoUrl;
        driver.teamColour = selectedTeam.colour;
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
      'calendar.races.results.$': 1,
      'calendar.seasonName': 1,
      'calendar.raceFormat': 1,
      'calendar.races.venue': 1,
      'calendar.races.date': 1,
      'calendar.races.circuit': 1,
      'calendar.drivers': 1,
      'calendar.teams': 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      let race = results[0].calendar.races[0];
      console.log(race);
      let raceFormat = results[0].calendar.raceFormat;

      if (race.results === null) {
        res.json(results[0]);
        return results[0];
      }

      race = formatResults.formatResults(race, raceFormat);

      results[0].calendar.races[0].adjustedResults = setDriversDetails(
        results[0]
      );

      results[0].calendar.races[0].adjustedResults = setTeamsDetails(
        results[0]
      );

      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
