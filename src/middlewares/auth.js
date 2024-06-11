const admin = require("../firebaseAdmin");

const verifyToken = async (req, res, next) => {
    console.log("req.headers", req.headers);
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    console.log("idToken입니다아아", idToken);

    if (!idToken) {
        console.log("Unauthorized 에러");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log("decodedToken입니다아아", decodedToken);
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        console.log("error입니다아아", error);
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = verifyToken;
