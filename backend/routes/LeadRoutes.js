import express from "express";
const router = express.Router();

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  searchLeads,
} from "../controllers/LeadController.js";

router.post("/", createLead);
router.get("/", getLeads);
router.get("/search", searchLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
