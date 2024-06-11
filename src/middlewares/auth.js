const admin = require("../firebaseAdmin");

const verifyToken = async (req, res, next) => {
    console.log("req.headers", req.headers);
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    console.log("idToken", idToken);

    if (!idToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = verifyToken;
