const express = require("express");
const router= express.Router();
const { cropAnalysis,getAllReports,getReportById } = require("../controllers/crop.controller");

router.route("/reports").get(getAllReports);
router.route("/image").post(cropAnalysis);
router.route("/report/:id").get(getReportById);

module.exports = router; 