const fetch = require("node-fetch");
const redis = require("redis");
const constants = require("./server-constants");

const DB_URL = constants.DatabaseUrl;
const REDIS_PORT = process.env.REDIS_SERVER_PORT || 6060;

const client = redis.createClient(REDIS_PORT);

module.exports = {
  // Make request to Database for data
  getProfile: async function getProfile(req, res, next) {
    try {
      const { key } = req.body.key;
      const { id } = req.body.ID;

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
        .then((res) => {
          res
            .json()
            .then(async (data) => {
              // Set data to Redis
              client.setex(key, 600, data);

              res.send(value);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("Error Login: " + error);
        });
    } catch (err) {
      console.error(err);
    }
  },

  // Cache middleware
  cache: function cache(req, res, next) {
    const { key } = req.body.key;

    client.get(key, (err, data) => {
      if (err) throw err;

      if (data !== null) {
        res.send(data);
      } else {
        next();
      }
    });
  },
};
