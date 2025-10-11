"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const dmRoutes_1 = __importDefault(require("./routes/dmRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const outreachRoutes_1 = __importDefault(require("./routes/outreachRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log("❌ MongoDB connection failed:", err));
// Routes
app.use("/api/profile", profileRoutes_1.default);
app.use("/api/dm", dmRoutes_1.default);
app.use("/api", brandRoutes_1.default);
app.use('/api/outreach', outreachRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/auth", auth_1.default);
// Basic route
app.get("/", (req, res) => {
    res.send("PitchPal backend is running 🚀");
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
