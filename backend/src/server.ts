import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import profileRoutes from "./routes/profileRoutes";
import dmRoutes from "./routes/dmRoutes";
import brandRoutes from "./routes/brandRoutes";
import outreachRoutes from './routes/outreachRoutes';
import dashboardRoutes from "./routes/dashboardRoutes";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err));

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/dm", dmRoutes);
app.use("/api", brandRoutes);
app.use('/api/outreach', outreachRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);



// Basic route
app.get("/", (req, res) => {
  res.send("PitchPal backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});