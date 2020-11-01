const firebase = require("firebase").default;
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDgp49UFzGk8sW4qn6myUkKcfBATQ-AChk",
  authDomain: "gameexchange-879cb.firebaseapp.com",
  projectId: "gameexchange-879cb",
});

var db = firebase.firestore();

db.collection("UserCollection").add({
  id: "sadasasdasd",
}).catch(function(err) {
  console.log(err);
});