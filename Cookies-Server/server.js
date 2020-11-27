const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const PAGE_PATH = "./static_page.html";
const fetch = require('node-fetch');
const SERVER_NONE = "/";

var PORT = process.env.PORT || 8000;
const app = express();
app.use(cookieParser());

app.use(body_parser.json());
app.use(cors());

const server = app.listen(PORT, () => {
  PORT = server.address().port;
  process.env.NODE_ENV = "production";
  console.log("Listening on port:", PORT);
});

app.get(SERVER_NONE, (req, res) => {
  res.sendFile(PAGE_PATH, { root: __dirname });
});

app.post("/cookies-insert", (req, res) => {
  var keys = req.body.keys;
  var values = req.body.values;
  var ages = req.body.ages;

  // inserting cookies for client
  for (let i = 0; i < keys.length; i++) {
    res.cookie(keys[i], values[i], {
      maxAge: ages[i],
    });
  }

  res.send('Success');
});

app.post("/cookies-get", (req, res) => {
  // We extract the raw cookies from the request headers
  var rawCookies = req.headers.cookie;
  rawCookies = rawCookies.split("; ");
  // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

  var parsedCookies = {};
  rawCookies.forEach((rawCookie) => {
    var parsedCookie = rawCookie.split("=");
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });

  res.send({ cookies: parsedCookies[req.body.key] });
});

app.post("/cookies-clear", (req, res) => {
  var keys = req.body.keys;
  
  keys.forEach((key) => {
    res.clearCookie(key);
  });

  res.send("Success");
});

module.exports = app;
