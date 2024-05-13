const express = require("express");
const {
    addWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

router.post("/workouts", addWorkout);
router.get("/workouts", getWorkouts);
router.get("/workouts/:exId", getWorkoutById);
router.put("/workouts/:exId", updateWorkout);
router.delete("/workouts/:exId", deleteWorkout);

module.exports = router;
