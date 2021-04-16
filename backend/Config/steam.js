const passport = require('passport');
const { Strategy } = require('passport-steam');
const User = require('../models/user.model');
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

const strategyOptions = {
  returnURL: `${process.env.BASE_URL}/auth/steam/return`,
  realm: `${process.env.BASE_URL}/`,
  apiKey: process.env.STEAM_API_KEY,
};

module.exports = (app) => {
  passport.use(
    new Strategy(strategyOptions, async (identifier, profile, done) => {
      profile.identifier = identifier;
      let users = await client
        .db('RGL')
        .collection('users')
        .find({ steamId: profile.id })
        .toArray();
      let user = users[0];
      if (!user) {
        user = new User(
          profile._json.steamid,
          profile._json.personaname,
          profile._json.avatar
        );
        user._id = ObjectId();
        client
          .db('RGL')
          .collection('users')
          .insertOne(user)
          .catch((error) => console.error(error));
      }
      return done(null, user);
    })
  );

  app.use(passport.initialize());
};
