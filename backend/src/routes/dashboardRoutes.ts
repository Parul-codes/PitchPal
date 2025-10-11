import express from "express";
import Profile from "../models/Profile";
import Outreach from "../models/outreachRecords"; 
import Form from "../models/Form";

const router = express.Router();

// GET /api/dashboard
router.get("/", async (req, res) => {
  try {
    const totalBrandsPitched = await Outreach.countDocuments();
    const dmsSent = await Outreach.countDocuments({ status: "Sent" });
    const responsesReceived = await Outreach.countDocuments({ status: "Replied" });
    const followUpsPending = await Outreach.countDocuments({ status: "Following Up" });
    const formsFilled = await Form.countDocuments();

    const acceptanceRate =
      totalBrandsPitched > 0
        ? Math.round((responsesReceived / totalBrandsPitched) * 100)
        : 0;

    res.status(200).json({
      totalBrandsPitched,
      dmsSent,
      formsFilled,
      followUpsPending,
      responsesReceived,
      acceptanceRate,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
});

export default router;
