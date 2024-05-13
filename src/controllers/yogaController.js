const db = require("../models/db");

// 요가 세션 추가
const addYoga = async (req, res) => {
    const { yId, yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid } = req.body;
    console.log(req.body);
    try {
        const [rows] = await db.query(
            "INSERT INTO yogas (yId, yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [yId, yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid]
        );
        res.status(201).json({ yId, yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 모든 요가 세션 조회
const getYogas = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM yogas");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 요가 세션 조회
const getYogaById = async (req, res) => {
    const { yId } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM yogas WHERE yId = ?", [yId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Yoga session not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 요가 세션 업데이트
const updateYoga = async (req, res) => {
    const { yId } = req.params;
    const { yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid } = req.body;
    try {
        await db.query(
            "UPDATE yogas SET yogaDate = ?, yogaType = ?, yogaDuration = ?, yogaInstructor = ?, yogaNote = ?, uid = ? WHERE yId = ?",
            [yogaDate, yogaType, yogaDuration, yogaInstructor, yogaNote, uid, yId]
        );
        res.status(200).json({ message: "Yoga session updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 요가 세션 삭제
const deleteYoga = async (req, res) => {
    const { yId } = req.params;
    try {
        await db.query("DELETE FROM yogas WHERE yId = ?", [yId]);
        res.status(200).json({ message: "Yoga session deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addYoga, getYogas, getYogaById, updateYoga, deleteYoga };
