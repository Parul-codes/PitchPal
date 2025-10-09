import express from "express";
import Profile from "../models/Profile";

const router = express.Router();

// Create a new profile
router.post("/", async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (err : string | any) {
    res.status(400).json({ error: err.message });
  }
});

// Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err : string | any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single profile by ID
router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err : string | any) {
    res.status(500).json({ error: err.message });
  }
});

// Update a profile by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProfile) return res.status(404).json({ error: "Profile not found" });
    res.json(updatedProfile);
  } catch (err : string | any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a profile by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err : string | any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
