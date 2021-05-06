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

router.post('/submit-comment', (req, res) => {
  const isSubcomment = req.body.commentData.parameters.isSubcomment;
  const parentCommentId = req.body.commentData.parameters.parentCommentId;

  const queryForComment = {
    _id: ObjectId(req.body.commentData.parameters.articleID),
  };
  const queryForSubcomment = {
    _id: ObjectId(req.body.commentData.parameters.articleID),
    'comments.id': parentCommentId,
  };

  const pushComment = (results) => {
    const commentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentData.comment.author,
      content: req.body.commentData.comment.content,
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
      .updateOne(queryForComment, update, options)
      .catch((error) => console.error(error));
  };

  const pushSubcomment = (results) => {
    const subcommentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentData.comment.author,
      content: req.body.commentData.comment.content,
      likes: [],
    };

    subcommentTuPush.id =
      results[0] &&
      results[0].comments &&
      results[0].comments[parentCommentId - 1] &&
      results[0].comments[parentCommentId - 1].subcomments &&
      results[0].comments[parentCommentId - 1].subcomments.length + 1;

    const update = { $push: { 'comments.$.subcomments': subcommentTuPush } };
    const options = { upsert: false };

    client
      .db('RGL')
      .collection('news')
      .updateOne(queryForSubcomment, update, options)
      .then(res.json(`SubComment sent to database`))
      .catch((error) => console.error(error));
  };

  client
    .db('RGL')
    .collection('news')
    .find(queryForComment)
    .project({ comments: 1 })
    .toArray()
    .then((results) => {
      isSubcomment ? pushSubcomment(results) : pushComment(results);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
