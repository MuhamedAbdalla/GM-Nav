const firebase = require("./admin");

module.exports = {
  gmailAuth: async function GmailAuthentication() {
    var provider = new firebase.auth.GoogleAuthProvider();
    var user = null;

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (res) {
        user = res.user;

        firebase
          .auth()
          .sendPasswordResetEmail(user.email)
          .then(() => {
            return user;
          })
          .catch((error) => {
            console.log("Error Email Sender: " + error);
          });
      })
      .catch((error) => {
        console.log("Gmail Service Error: " + error.code);
        return error.code;
      });
      
    return user;
  },

  gmailAuthOnly: async function GmailAuthenticationOnly(email, password) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((_) => {
        console.log('sadasdasdasdasdasdasd');
      })
      .catch((error) => {
        console.log("Gmail Only Service Error: " + error.code);
      });
  },
};
