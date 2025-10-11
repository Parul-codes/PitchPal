import express from "express";
import Profile from "../models/Profile";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// 🔒 Get current user's profile
router.get("/", protect, async (req: any, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔒 Create or update current user's profile
// 🔒 Create or update current user's profile
router.post("/", protect, async (req: any, res) => {
  try {
    const {
      name,
      email,
      bio,
      instagram,
      tiktok,
      followers,
      niche,
      location,
      rates,
      mediaKit,
    } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile.name = name || profile.name;
      profile.email = email || profile.email;
      profile.bio = bio || profile.bio;
      profile.instagram = instagram || profile.instagram;
      profile.tiktok = tiktok || profile.tiktok;
      profile.followers = followers || profile.followers;
      profile.niche = niche || profile.niche;
      profile.location = location || profile.location;
      profile.rates = rates || profile.rates;
      profile.mediaKit = mediaKit || profile.mediaKit;

      profile = await profile.save();
      return res.json(profile);
    }

    // Create new profile
    profile = new Profile({
      user: req.user._id,
      name,
      email,
      bio,
      instagram,
      tiktok,
      followers: followers || { instagram: 0, tiktok: 0 },
      niche,
      location,
      rates: rates || { post: 0, story: 0, reel: 0 },
      mediaKit,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});


// 🔒 Delete current user's profile
router.delete("/", protect, async (req: any, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user._id });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
