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
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/yogas", yogaRoutes);
app.use("/workouts", workoutRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
