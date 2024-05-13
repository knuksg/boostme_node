const db = require("../models/db");

// 사용자 추가
const addUser = async (req, res) => {
    console.log(req.body);
    const { uid, email, username, bio, photo_url } = req.body;
    try {
        const [rows] = await db.query(
            "INSERT INTO users (uid, email, username, bio, photo_url) VALUES (?, ?, ?, ?, ?)",
            [uid, email, username, bio, photo_url]
        );
        console.log(rows);
        res.status(201).json({ uid, email, username, bio, photo_url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 사용자 정보 조회
const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 사용자 조회
const getUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE uid = ?", [uid]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 사용자 업데이트
const updateUser = async (req, res) => {
    const { uid } = req.params;
    const { email, username, bio, photo_url } = req.body;
    try {
        await db.query(
            "UPDATE users SET email = ?, username = ?, bio = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE uid = ?",
            [email, username, bio, photo_url, uid]
        );
        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 사용자 삭제
const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        await db.query("DELETE FROM users WHERE uid = ?", [uid]);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser };
