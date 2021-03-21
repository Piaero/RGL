var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  const db = client.db('RGL');
  const countersCollection = db.collection('news');
});

router.get('/news', (req, res) => {
  client
    .db('RGL')
    .collection('news')
    .find()
    .toArray()
    .then((results) => {
      results.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      res.json(results);
    })
    .catch((error) => console.error(error));
});

router.post('/news/article', async (req, res) => {
  client
    .db('RGL')
    .collection('news')
    .find({ _id: ObjectId(req.body.topicId) })
    .toArray()
    .then((results) => {
      results[0].comments.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
