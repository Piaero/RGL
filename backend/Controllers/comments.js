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

  console.log(`--------------------------------`);
  console.log(`is comment or subcomment value: ${isCommentOrSubcomment}`);
  console.log(`true or false: ${isCommentOrSubcomment ? `true` : `false`}`);
  console.log(`--------------------------------`);
  console.log(`--------------------------------`);
  console.log(`--------------------------------`);

  console.log(JSON.stringify(req.body.commentToSubmit));

  console.log(`--------------------------------`);
  console.log(`--------------------------------`);
  console.log(`--------------------------------`);

  const pushComment = (results) => {
    console.log(`I am in main comments`);

    const commentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentToSubmit.author,
      content: req.body.commentToSubmit.content,
      likes: [],
      subcomments: [],
    };
    const update = { $push: { comments: commentTuPush } };
    const options = { upsert: true };

    commentTuPush.id =
      results[0] && results[0].comments && results[0].comments.length + 1;

    client
      .db('RGL')
      .collection('news')
      .updateOne(query, update, options)
      .catch((error) => console.error(error));
  };

  const pushSubcomment = (results) => {
    console.log(`I am in subcomment`);

    const subcommentTuPush = {
      id: '',
      date: new Date(),
      author: req.body.commentToSubmit.author,
      content: req.body.commentToSubmit.content,
      likes: [],
    };

    var queryForPushSubcomment = `comments.subcomments.&`;

    const update = { $push: { 'comments.$.subcomments': subcommentTuPush } };

    // const update = {
    //   $push: {
    //     $arrayElemAt: [comments, 0],
    //   },
    // };

    const options = { upsert: false };

    // subcommentTuPush.id =
    //   results[0] &&
    //   results[0].comments &&
    //   results[0].comments.subcomments &&
    //   results[0].comments.subcomments.length + 1;

    // comments[responseToCommentID].subcomments.length + 1

    // console.log(results[0].comments[isCommentOrSubcomment - 1]);

    givenCommentID =
      results[0] &&
      results[0].comments &&
      results[0].comments[isCommentOrSubcomment] &&
      results[0].comments[isCommentOrSubcomment].subcomments &&
      results[0].comments[isCommentOrSubcomment].subcomments.length + 1;

    console.log(givenCommentID);

    const querytwo = {
      _id: ObjectId(req.body.commentToSubmit.articleID),
      'comments.id': isCommentOrSubcomment,
    };

    client
      .db('RGL')
      .collection('news')
      .updateOne(querytwo, update, options)
      .catch((error) => console.error(error));
  };

  // const commentTuPush = {
  //   id: '',
  //   date: new Date(),
  //   author: req.body.commentToSubmit.author,
  //   content: req.body.commentToSubmit.content,
  //   likes: [],
  //   subcomments: [],
  // };
  // const query = { _id: ObjectId(req.body.commentToSubmit.articleID) };
  // const update = { $push: { comments: commentTuPush } };
  // const options = { upsert: true };

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
    });
});

module.exports = router;
