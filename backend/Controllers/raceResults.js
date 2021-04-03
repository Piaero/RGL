var express = require('express');
var router = express.Router();
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

router.post('/race-results', (req, res) => {
  client
    .db('RGL')
    .collection('divisions')
    .find({
      'pages.calendar.races.country': req.body.resultsDetails.country,
      division: req.body.resultsDetails.division,
    })
    .collation({ locale: 'en', strength: 1 })
    .project({
      'pages.calendar.races.results.$': 1,
      'pages.calendar.races.venue': 1,
      'pages.calendar.races.country': 1,
      'pages.calendar.season-name': 1,
      'pages.calendar.races.date': 1,
      division: 1,
      game: 1,
      gameLogo: 1,
    })
    .toArray()
    .then((results) => {
      console.log(JSON.stringify(results[0], null, 2));
      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
