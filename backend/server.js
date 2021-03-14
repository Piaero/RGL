const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const divisions = require("./Controllers/divisions.js");
const news = require("./Controllers/news.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/divisions", divisions);
app.get("/news", news);

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
