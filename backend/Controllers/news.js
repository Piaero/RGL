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

router.get('/news/article', (req, res) => {
  client
    .db('RGL')
    .collection('news')
    .find({ _id: ObjectId(req.query.id) })
    .toArray()
    .then((results) => {
      results[0].comments
        ? results[0].comments.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          })
        : null;

      results[0].comments
        ? results[0].comments.forEach((comment) => {
            comment.subcomments
              ? comment.subcomments.sort((a, b) => {
                  return new Date(a.date) - new Date(b.date);
                })
              : null;
          })
        : null;
      res.json(results[0]);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
