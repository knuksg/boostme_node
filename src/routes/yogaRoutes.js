const express = require("express");
const { addYoga, getYogas, getYogaById, updateYoga, deleteYoga } = require("../controllers/yogaController");
const router = express.Router();

router.post("/yogas", addYoga); // 요가 세션 추가
router.get("/yogas", getYogas); // 모든 요가 세션 조회
router.get("/yogas/:yId", getYogaById); // 특정 요가 세션 조회
router.put("/yogas/:yId", updateYoga); // 요가 세션 업데이트
router.delete("/yogas/:yId", deleteYoga); // 요가 세션 삭제

module.exports = router;
