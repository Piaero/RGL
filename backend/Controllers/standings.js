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

router.get('/standings', (req, res) => {
  const setRacesPoints = (races, raceFormat) => {
    let adjustedRaces = [];

    for (let race of races) {
      if (race.results !== null) {
        race = formatResults.formatResults(race, raceFormat);
        adjustedRaces.push(race);
      }
    }

    return adjustedRaces;
  };

  client
    .db('RGL')
    .collection('divisions')
    .find({ division: req.query.division })
    .project({
      calendar: 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      let races = results[0].calendar.races;
      const raceFormat = results[0].calendar.raceFormat;
      let drivers = results[0].calendar.drivers;
      let teams = results[0].calendar.teams;

      const adjustedRaces = setRacesPoints(races, raceFormat);

      //   console.log(JSON.stringify(results[0], null, 2));

      // if (results[0].calendar.races[0].results === null) {
      //   res.json(results[0]);
      //   return results[0];
      // }

      // formatResults(results[0]);

      // console.log(JSON.stringify(drivers, null, 2));

      // console.log(JSON.stringify(teams, null, 2));

      // console.log(JSON.stringify(adjustedRaces, null, 2));
      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
