const express = require("express");
const {
    addWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

router.post("/", addWorkout);
router.get("/", getWorkouts);
router.get("/:exId", getWorkoutById);
router.put("/:exId", updateWorkout);
router.delete("/:exId", deleteWorkout);

module.exports = router;
