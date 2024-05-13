const db = require("../models/db");

// 게시물 추가
const addPost = async (req, res) => {
    const { postId, description, uid, username, likes, postUrl, profImage } = req.body;
    try {
        const [rows] = await db.query(
            "INSERT INTO posts (postId, description, uid, username, likes, postUrl, profImage) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [postId, description, uid, username, JSON.stringify(likes), postUrl, profImage]
        );
        res.status(201).json({ postId, description, uid, username, likes, postUrl, profImage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 모든 게시물 조회
const getPosts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM posts");
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 게시물 조회
const getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM posts WHERE postId = ?", [postId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 게시물 업데이트
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { description, uid, username, likes, postUrl, profImage } = req.body;
    try {
        await db.query(
            "UPDATE posts SET description = ?, uid = ?, username = ?, likes = ?, postUrl = ?, profImage = ?, datePublished = CURRENT_TIMESTAMP WHERE postId = ?",
            [description, uid, username, JSON.stringify(likes), postUrl, profImage, postId]
        );
        res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 게시물 삭제
const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        await db.query("DELETE FROM posts WHERE postId = ?", [postId]);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addPost, getPosts, getPostById, updatePost, deletePost };
