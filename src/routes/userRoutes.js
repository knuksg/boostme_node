const express = require("express");
const { addUser, getUser, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/", addUser);
router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
