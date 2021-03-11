const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Database
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) throw err;
  const db = client.db("RGL");
  const countersCollection = db.collection("divisions");
  console.log("connected to Database");
});

app.get("/divisions", (req, res) => {
  client
    .db("RGL")
    .collection("divisions")
    .find()
    .project({ division: 1, path: 1, gameLogo: 1 })
    .toArray()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => console.error(error));
});

// Heroku deployment compatibility:
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "..", "frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "frontend/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
