const firebase = require("firebase").default;
const test_url =
  process.env.MOCKFIREBASE_DB_URL || "https://localhost.firebaseio.test:5000";

// Required for side-effects
require("firebase/firestore");

if (process.env.NODE_ENV === "test" && test_url) {
  firebase.initializeApp({
    projectId: "gameexchange-879cb",
    apiKey: "AasaSyDgp49UFzGk8sW4qn6myUkKcfBATQ-AChk",
    databaseURL: test_url,
  });
} else {
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDgp49UFzGk8sW4qn6myUkKcfBATQ-AChk",
    authDomain: "gameexchange-879cb.firebaseapp.com",
    databaseURL: "https://gameexchange-879cb.firebaseio.com",
    projectId: "gameexchange-879cb",
    storageBucket: "gameexchange-879cb.appspot.com",
    messagingSenderId: "960617817785",
    appId: "1:960617817785:web:2b2e6bfa92e207668b9d68",
    measurementId: "G-77TNXWKQ5N",
  });
}

module.exports = firebase;
