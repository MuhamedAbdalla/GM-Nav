const firebase = require("./admin");

module.exports = {
  storage: async function storageUploader(imageUrl) {
      var dbStorage = firebase.storage().ref();
      const metadata = {
        contentType: imageUrl.type
      }
      var newUrl = await (await dbStorage.child(imageUrl.name).put(imageUrl, metadata)).ref.getDownloadURL();

      setTimeout(async () => { }, 5000);

      return newUrl;
  },
};
