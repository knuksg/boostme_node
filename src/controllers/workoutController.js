const db = require("../models/db");

// 운동 추가
const addWorkout = async (req, res) => {
    const { exId, exerciseName, uid, exWeight, exReps, exSets, exDate } = req.body;
    try {
        const [rows] = await db.query(
            "INSERT INTO workouts (exId, exerciseName, uid, exWeight, exReps, exSets, exDate) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [exId, exerciseName, uid, exWeight, exReps, exSets, exDate]
        );
        res.status(201).json({ exId, exerciseName, uid, exWeight, exReps, exSets, exDate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 모든 운동 조회
const getWorkouts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM workouts");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 운동 조회
const getWorkoutById = async (req, res) => {
    const { exId } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM workouts WHERE exId = ?", [exId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 운동 업데이트
const updateWorkout = async (req, res) => {
    const { exId } = req.params;
    const { exerciseName, uid, exWeight, exReps, exSets, exDate } = req.body;
    try {
        await db.query(
            "UPDATE workouts SET exerciseName = ?, uid = ?, exWeight = ?, exReps = ?, exSets = ?, exDate = ? WHERE exId = ?",
            [exerciseName, uid, exWeight, exReps, exSets, exDate, exId]
        );
        res.status(200).json({ message: "Workout updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 운동 삭제
const deleteWorkout = async (req, res) => {
    const { exId } = req.params;
    try {
        await db.query("DELETE FROM workouts WHERE exId = ?", [exId]);
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addWorkout, getWorkouts, getWorkoutById, updateWorkout, deleteWorkout };
