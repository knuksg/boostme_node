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
        const limit = parseInt(req.query.limit) || 10; // 기본값 10
        const offset = parseInt(req.query.offset) || 0; // 기본값 0

        const countQuery = "SELECT COUNT(*) as total FROM posts";
        const [countRows] = await db.query(countQuery);
        const total = countRows[0].total;

        const query = "SELECT * FROM posts ORDER BY datePublished DESC LIMIT ? OFFSET ?";
        const [rows] = await db.query(query, [limit, offset]);

        res.status(200).json({ total, posts: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 유저의 게시물 조회
const getPostsByUid = async (req, res) => {
    const { uid } = req.params;
    const limit = parseInt(req.query.limit) || 10; // 기본값 10
    const offset = parseInt(req.query.offset) || 0; // 기본값 0

    try {
        // 전체 게시물 수 조회
        const countQuery = "SELECT COUNT(*) as total FROM posts WHERE uid = ?";
        const [countRows] = await db.query(countQuery, [uid]);
        const total = countRows[0].total;

        // 페이징된 게시물 조회
        const query = "SELECT * FROM posts WHERE uid = ? ORDER BY datePublished DESC LIMIT ? OFFSET ?";
        const [rows] = await db.query(query, [uid, limit, offset]);

        res.status(200).json({ total, posts: rows });
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

module.exports = { addPost, getPosts, getPostsByUid, getPostById, updatePost, deletePost };
