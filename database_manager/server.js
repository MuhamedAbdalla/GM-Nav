const firebase = require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDgp49UFzGk8sW4qn6myUkKcfBATQ-AChk",
    authDomain: 'gameexchange-879cb.firebaseapp.com',
    projectId: 'gameexchange-879cb'
  });
  
  var db = firebase.firestore();