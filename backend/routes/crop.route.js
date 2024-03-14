import express from "express";
const router= express.Router();
import { cropAnalysis,getAllReports,getReportById } from "../controllers/crop.controller";

router.route("/getRports").get(getAllReports);
router.route("/imageAnalysis").post(cropAnalysis);
router.route("/report/:id").get(getReportById);

module.exports = router;