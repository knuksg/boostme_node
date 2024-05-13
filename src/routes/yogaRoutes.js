const express = require("express");
const { addYoga, getYogas, getYogaById, updateYoga, deleteYoga } = require("../controllers/yogaController");
const router = express.Router();

router.post("/", addYoga); // 요가 세션 추가
router.get("/", getYogas); // 모든 요가 세션 조회
router.get("/:yId", getYogaById); // 특정 요가 세션 조회
router.put("/:yId", updateYoga); // 요가 세션 업데이트
router.delete("/:yId", deleteYoga); // 요가 세션 삭제

module.exports = router;
