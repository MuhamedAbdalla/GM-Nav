const express = require("express");
const fetch = require("node-fetch");
const constants = require("./server-constants.js");

const PORT = process.env.PORT || 3030;

const DB_URL = constants.DatabaseUrl;

const app = express();

app.post("/Add-Post", async (req, res) => {
    
});

app.post("/update-Post", async (req, res) => {
  // TODO: to be implemented, FUTURE UPDATES!!
});

app.listen(3030, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
