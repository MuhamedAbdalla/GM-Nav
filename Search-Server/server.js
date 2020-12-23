const express = require('express');
const fetch = require("node-fetch");
const redis = require("redis");
const constants = require("./server-constants.js");

const PORT = process.env.PORT || 7070;
const REDIS_PORT = process.env.REDIS_SERVER_PORT || 6379;

const DB_URL = constants.DatabaseUrl;
const client = redis.createClient(REDIS_PORT);

const app = express();

function Hashing(conditions, key) {
    var hash = key;
    conditions.forEach(element => {
        hash += element.field.toString();
        hash += element.value.toString();
        hash += element.type.toString();
        hash += element.desc.toString();
    });
    return hash;
}

// Make request to Database for data
async function getSearch(curKey, condition) {
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
            client.setex(Hashing(conditions, key), 600, data.response);

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

app.post('/Cache-Search', async (req, res) => {
  const key = req.body.UserKey;
  const condition = req.body.Condition;

  const data = await cache(Hashing(condition, key));
  
  if (data === null) {
    data = await getSearch(key, condition);
  }

  res.send({ data: data });
});

app.listen(7070, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;