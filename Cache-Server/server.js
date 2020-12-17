const express = require('express');
const profile_cache = require('./profile-cache');

const PORT = process.env.PORT || 5050;

const app = express();

app.get('/Cache-Profile', profile_cache.cache, profile_cache.getProfile);

app.listen(5050, () => {
  console.log(`App listening on port ${PORT}`);
});