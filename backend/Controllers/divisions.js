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

router.get('/divisions', (req, res) => {
  client
    .db('RGL')
    .collection('divisions')
    .find()
    .project({ division: 1, path: 1, gameLogo: 1 })
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
