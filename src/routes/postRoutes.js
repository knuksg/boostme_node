const express = require("express");
const { addPost, getPosts, getPostById, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

router.post("/", addPost);
router.get("/", getPosts);
router.get("/:postId", getPostById);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

module.exports = router;
