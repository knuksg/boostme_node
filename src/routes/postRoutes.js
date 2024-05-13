const express = require("express");
const { addPost, getPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

router.post("/posts", addPost);
router.get("/posts", getPosts);
router.get("/posts/:postId", getPostById);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

module.exports = router;
