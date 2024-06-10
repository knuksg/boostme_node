const express = require("express");
const { addWeight, getWeights } = require("../controllers/weightController");
const router = express.Router();

router.post("/", addWeight);
router.get("/", getWeights);

module.exports = router;
