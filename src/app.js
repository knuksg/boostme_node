const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const weightRoutes = require("./routes/weightRoutes");
const chatRoutes = require("./routes/chatRoutes");
const verifyToken = require("./middlewares/auth");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(verifyToken); // 모든 라우트에 대해 인증 미들웨어 적용
app.use("/users", userRoutes);
app.use("/weights", weightRoutes);
app.use("/chats", chatRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
