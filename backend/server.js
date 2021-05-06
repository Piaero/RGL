const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const divisions = require('./Controllers/divisions.js');
const news = require('./Controllers/news.js');
const calendar = require('./Controllers/calendar.js');
const raceResults = require('./Controllers/raceResults.js');

const comments = require('./Controllers/comments.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  const db = client.db('RGL');
  const countersCollection = db.collection('news');
  console.log('connected to Database');
});

app.get('/divisions', divisions);
app.get('/news', news);
app.get('/news/article', news);
app.post('/submit-comment', comments);
app.get('/calendar', calendar);
app.get('/race-results', raceResults);

// Heroku deployment compatibility:
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '..', 'frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend/build', 'index.html'));
  });
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
require('./Config/steam')(app);
app.use('/auth', require('./Controllers/auth'));

app.listen(port, () => console.log(`Listening on port ${port}`));
