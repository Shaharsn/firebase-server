const admin = require("firebase-admin");

var serviceAccount = require(".././resources/employesss-managment-firebase-adminsdk-hb6cv-c63f14627d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://employesss-managment-default-rtdb.firebaseio.com"
});

module.exports = admin;