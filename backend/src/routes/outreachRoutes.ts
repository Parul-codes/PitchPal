import { Router } from 'express';
import OutreachRecord, { IOutreachRecord } from '../models/outreachRecords';
import express, { Response } from "express";
import { verifyToken, AuthenticatedRequest } from "../middleware/outreachMiddleware";

const router = express.Router();

router.get("/", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await OutreachRecord.find({ userId: req.user?.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching outreach data" });
  }
});

router.post("/", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newEntry = new OutreachRecord({
      ...req.body,
      userId: req.user?.id,
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Error saving outreach data" });
  }
});

router.put("/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const outreach = await OutreachRecord.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id }, // ensure ownership
      req.body,
      { new: true }
    );

    if (!outreach) {
      return res.status(404).json({ message: "Outreach not found or unauthorized" });
    }

    res.json(outreach);
  } catch (err) {
    res.status(500).json({ message: "Error updating outreach" });
  }
});

router.delete("/:id", verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const outreach = await OutreachRecord.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id, // ensure only the owner can delete
    });

    if (!outreach) {
      return res.status(404).json({ message: "Outreach not found or unauthorized" });
    }

    res.json({ message: "Outreach deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting outreach" });
  }
});

export default router;
