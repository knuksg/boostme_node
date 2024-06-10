const db = require("../models/db");

// 체중 데이터 추가 또는 업데이트
const addWeight = async (req, res) => {
    const { weight } = req.body;
    const uid = req.uid; // 인증 미들웨어에서 설정된 uid 사용

    try {
        const [rows] = await db.query(
            "INSERT INTO weights (uid, date, weight) VALUES (?, CURDATE(), ?) ON DUPLICATE KEY UPDATE weight = VALUES(weight)",
            [uid, weight]
        );
        res.status(201).json({ uid, date: new Date().toISOString().split("T")[0], weight });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 체중 데이터 조회
const getWeights = async (req, res) => {
    const uid = req.uid; // 인증 미들웨어에서 설정된 uid 사용

    try {
        const [rows] = await db.query("SELECT * FROM weights WHERE uid = ? ORDER BY date DESC", [uid]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addWeight, getWeights };
