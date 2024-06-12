const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const weightRoutes = require("./routes/weightRoutes");
const chatRoutes = require("./routes/chatRoutes");
const productRoutes = require("./routes/productRoutes"); // 상품 라우트 추가
const verifyToken = require("./middlewares/auth");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 인증이 필요한 라우트
app.use("/users", verifyToken, userRoutes);
app.use("/weights", verifyToken, weightRoutes);
app.use("/chats", verifyToken, chatRoutes);

// 인증이 필요 없는 라우트
app.use("/products", productRoutes); // 상품 라우트 추가

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
