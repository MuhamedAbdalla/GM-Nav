const firebase = require("firebase").default;
const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');

// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDgp49UFzGk8sW4qn6myUkKcfBATQ-AChk",
  authDomain: "gameexchange-879cb.firebaseapp.com",
  projectId: "gameexchange-879cb",
});

var db = firebase.firestore();
const DatabaseConstants = [
  "GREATER_THAN_OR_EQUAL",
  "START_AFTER_DOCUMENT",
  "LESS_THAN_OR_EQUAL",
  "GREATER_THAN",
  "CONTAINS_ANY",
  "LESS_THAN",
  "CONTAINS",
  "ORDER_BY",
  "EQUALS",
  "LIMIT",
];


var POST = 8080;
const app = express();

app.use(body_parser.json());
app.use(cors());


const server = app.listen(PORT, () => {
    POST = server.address().port;
    console.log('Listening on port:', POST);
});


app.post('/insert', async (req, res) => {
    var json = req.body;
    const path = json.path;
    const model = json.model;
    var collection = getDocument(path);

    await collection
    .set(
      model,
    )
    .then(() => {
      res.send('Success');
    })
    .catch( (error) => {
      console.log("Can't access database\nError details: " + error);
      res.send('Failed ' + error);
    });

    res.end();
});

app.put('/update', async (req, res) => {
  var json = req.body;
  const path = json.path;
  const model = json.model;
  var collection = getDocument(path);

  await collection
  .update(
    model,
  )
  .then(() => {
    res.send('Success');
  })
  .catch( (error) => {
    console.log("Can't access database\nError details: " + error);
    res.send('Failed ' + error);
  });
  
  res.end();
});

app.delete('/delete', async (req, res) => {
  var json = req.body;
  const path = json.path;
  const model = json.model;
  var collection = getDocument(path);

  await collection
  .delete()
  .then(() => {
    res.send('Success');
  })
  .catch( (error) => {
    console.log("Can't access database\nError details: " + error);
    res.send('Failed ' + error);
  });

  res.end();
});

app.get('/get', async (req, res) => {
  var json = req.body;
  const path = json.path;
  const model = json.model;
  var collection = getDocument(path);

  await collection
  .get()
  .then((doc) => {
    res.send(doc.data());
  })
  .catch( (error) => {
    console.log("Can't access database\nError details: " + error);
    res.send('Failed ' + error);
  });
  
  res.end();
});

app.get('/getWithConditions', async (req, res) => {
  var json = req.body;
  const path = json.path;
  const conditions = json.conditions;
  var collection = getCollection(path);

  for (let i = 0; i < conditions.length; i++) {
    switch(conditions[i].type) {
      case DatabaseConstants[0]:
        collection = collection.where(conditions[i].field, ">=", conditions[i].value);
        break;

      case DatabaseConstants[1]:
        collection = collection.startAfter(getDocument(conditions[i].value).get());
        break;

      case DatabaseConstants[2]:
        collection = collection.where(conditions[i].field, "<=", conditions[i].value);
        break;

      case DatabaseConstants[3]:
        collection = collection.where(conditions[i].field, ">", conditions[i].value);
        break;

      case DatabaseConstants[4]:
        collection = collection.where(conditions[i].field, "array-contains-any", conditions[i].value);
        break;

      case DatabaseConstants[5]:
        collection = collection.where(conditions[i].field, "<", conditions[i].value);
        break;

      case DatabaseConstants[6]:
        collection = collection.where(conditions[i].field, "array-contains", conditions[i].value);
        break;

      case DatabaseConstants[7]:
        collection = collection.orderBy(conditions[i].field, conditions[i].desc ? "desc" : "asc");
        break;

      case DatabaseConstants[8]:
        collection = collection.where(conditions[i].field, "==", conditions[i].value);
        break;
      
      case DatabaseConstants[9]:
        collection = collection.limit(conditions[i].value);
        break;
    }
  }

  let doc = await collection
  .get()
  .catch((error) => {
    console.log("Can't access database\nError details: " + error);
    res.send('Failed');
  });

  var data = doc.docs.map(document => document.data());

  res.send(data);

  res.end();
});

function getCollection(path) {
  var collection = db.collection(path[0]);

  for (let i = 1; i + 1 < path.length; i += 2) {
    collection = collection.doc(path[i]).collection(path[i + 1]);
  }
  
  return collection;
}

function getDocument(path) {
  var collection = getCollection(path);

  return collection.doc(path[path.length - 1]);
}

module.exports = {
    POST: POST
}