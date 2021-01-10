const express = require("express");
const fetch = require("node-fetch");
const constants = require("./server-constants.js");

const PORT = process.env.PORT || 3030;

const DB_URL = constants.DatabaseUrl;

const app = express();

app.post("/Add-Post", async (req, res) => {
  await fetch(DB_URL + '/insert', {
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      path: [constants.POST_COLLECTION_ENTRY],
      model: req.body.model,
    }),
  })
  .then((_) => {
    res.send('success');
  })
  .catch((error) => {
    console.log('Error Login: ' + error);
    res.send('fail');
  });
});

app.post("/update-Post", async (req, res) => {
  // TODO: to be implemented, FUTURE UPDATES!!
});

app.post("/mark-Post", async (req, res) => {
  await fetch(DB_URL + '/update', {
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      path: [constants.POST_COLLECTION_ENTRY],
      model: req.body.model,
    }),
  })
  .then((_) => {
    res.send('success');
  })
  .catch((error) => {
    console.log('Error Login: ' + error);
    res.send('fail');
  });
});

app.listen(3030, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
