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

router.get('/regulations', (req, res) => {
  client
    .db('RGL')
    .collection('divisions')
    .find({ division: req.query.division })
    .project({
      regulations: 1,
    })
    .toArray()
    .then((results) => {
      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
