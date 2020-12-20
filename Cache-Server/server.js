const express = require('express');
const fetch = require("node-fetch");
const redis = require("redis");
const constants = require("./server-constants");

const PORT = process.env.PORT || 5050;
const REDIS_PORT = process.env.REDIS_SERVER_PORT || 6379;

const DB_URL = constants.DatabaseUrl;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Make request to Database for data
async function getProfile(curKey, curID) {
  try {
    const key = curKey;
    const id = curID;

    var path = [constants.USER_COLLECTION_ENTRY];
    var conditions = [
      new Conditions(
        null,
        id,
        constants.USER_ID_ENTRY,
        constants.DatabaseConstants[8]
      ),
    ];

    // Request to database
    await fetch(DB_URL + "/getWithConditions", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: path,
        conditions: conditions,
      }),
    })
      .then((response) => {
        response
          .json()
          .then(async (data) => {
            // Set data to Redis
            client.setex(key, 600, data.response);

            return data.response;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      })
      .catch((error) => {
        console.log("Error Login: " + error);
        return null;
      });
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Make request to Database for data
async function getPosts(curKey, condition) {
  try {
    const key = curKey;
    const conditions = condition;

    var path = [constants.POST_COLLECTION_ENTRY];

    // Request to database
    await fetch(DB_URL + "/getWithConditions", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: path,
        conditions: conditions,
      }),
    })
      .then((response) => {
        response
          .json()
          .then(async (data) => {
            // Set data to Redis
            client.setex(key, 60, data.response);

            return data.response;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      })
      .catch((error) => {
        console.log("Error Login: " + error);
        return null;
      });
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Cache middleware
async function cache(curKey) {
  const key = curKey;

  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      return data;
    } else {
      return null;
    }
  });
}

app.post('/Cache-Profile', async (req, res) => {
  const key = req.body.UserKey;
  const ID = req.body.ID;

  const data = await cache(key);

  if (data === null) {
    data = await getProfile(key, ID);
  }

  res.send({ data: data });
});

app.post('/Cache-Posts', async (req, res) => {
  const key = req.body.UserKey;
  const condition = req.body.Condition;

  const data = await cache(key);

  if (data === null) {
    data = await getPosts(key, condition);
  }

  res.send({ data: data });
});

app.listen(5050, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;