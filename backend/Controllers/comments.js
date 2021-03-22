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
  const query = { _id: ObjectId(req.body.commentToSubmit.articleID) };
  const isCommentOrSubcomment = req.body.commentToSubmit.responseToCommentID;
  const queryForSubcomment = {
    _id: ObjectId(req.body.commentToSubmit.articleID),
    'comments.id': isCommentOrSubcomment,
  };

  const pushComment = (results) => {
    const commentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentToSubmit.author,
      content: req.body.commentToSubmit.content,
      likes: [],
      subcomments: [],
    };

    commentTuPush.id =
      results[0] && results[0].comments && results[0].comments.length + 1;

    const update = { $push: { comments: commentTuPush } };
    const options = { upsert: true };

    client
      .db('RGL')
      .collection('news')
      .updateOne(query, update, options)
      .catch((error) => console.error(error));
  };

  const pushSubcomment = (results) => {
    const subcommentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentToSubmit.author,
      content: req.body.commentToSubmit.content,
      likes: [],
    };

    givenCommentID =
      results[0] &&
      results[0].comments &&
      results[0].comments[isCommentOrSubcomment] &&
      results[0].comments[isCommentOrSubcomment].subcomments &&
      results[0].comments[isCommentOrSubcomment].subcomments.length + 1;

    const update = { $push: { 'comments.$.subcomments': subcommentTuPush } };
    const options = { upsert: false };

    client
      .db('RGL')
      .collection('news')
      .updateOne(queryForSubcomment, update, options)
      .catch((error) => console.error(error));
  };

  await client
    .db('RGL')
    .collection('news')
    .find(query)
    .project({ comments: 1 })
    .toArray()
    .then((results) => {
      isCommentOrSubcomment === false
        ? pushComment(results)
        : pushSubcomment(results);
    })
    .then(res.json(`Comment sent to database`))
    .catch((error) => console.error(error));
});

module.exports = router;
