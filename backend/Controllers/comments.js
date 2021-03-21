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
  const commentTuPush = {
    id: '',
    date: new Date(),
    author: req.body.commentToSubmit.author,
    content: req.body.commentToSubmit.content,
    likes: [],
    subcomments: [],
  };
  const query = { _id: ObjectId(req.body.commentToSubmit.articleID) };
  const update = { $push: { comments: commentTuPush } };
  const options = { upsert: true };

  await client
    .db('RGL')
    .collection('news')
    .find(query)
    .project({ comments: 1 })
    .toArray()
    .then((results) => {
      commentTuPush.id = results[0].comments.length + 1;
      client
        .db('RGL')
        .collection('news')
        .updateOne(query, update, options)
        .catch((error) => console.error(error));
    });
});

module.exports = router;
