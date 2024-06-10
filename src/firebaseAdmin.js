const admin = require("firebase-admin");
const serviceAccount = require("../boostme-147c6-firebase-adminsdk-2za8r-5b1eee336e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
