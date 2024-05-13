const express = require("express");
const { addUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:uid", getUserById);
router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);

module.exports = router;
