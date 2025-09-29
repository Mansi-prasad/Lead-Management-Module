import express from "express";
const router = express.Router();

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/LeadController.js";

router.post("/", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
