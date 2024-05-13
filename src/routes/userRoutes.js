const express = require("express");
const { addUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/users", addUser);
router.get("/users", getUsers);
router.get("/users/:uid", getUserById);
router.put("/users/:uid", updateUser);
router.delete("/users/:uid", deleteUser);

module.exports = router;
