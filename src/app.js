const cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const yogaRoutes = require("./routes/yogaRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", yogaRoutes);
app.use("/api", workoutRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
