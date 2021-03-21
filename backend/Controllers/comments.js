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

router.put('/submit-comment', async (req, res) => {
  console.log('/submit-comment is triggered');
  console.log(JSON.stringify(req.body.commentToSubmit));
  // const query = { _id: ObjectId(req.body.topicId) };
  // const update = { $push: { comments: 'fresh mozzarella' } };
  // const options = { upsert: true };
  const commentTuPush = {
    id: 111,
    date: req.body.commentToSubmit.date,
    author: req.body.commentToSubmit.author,
    content: req.body.commentToSubmit.content,
    likes: [],
    subcomments: [],
  };

  const query = { _id: ObjectId(req.body.commentToSubmit.topicId) };
  const update = { $push: { comments: commentTuPush } };
  const options = { upsert: true };

  client
    .db('RGL')
    .collection('news')
    .updateOne(query, update, options)

    // .find({ _id: ObjectId(req.body.topicId) })
    // .toArray()
    // .then((results) => {
    //   res.json(results[0]);
    // })
    .catch((error) => console.error(error));
});

module.exports = router;
