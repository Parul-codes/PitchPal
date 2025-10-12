"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dmController_1 = require("../controllers/dmController");
const router = express_1.default.Router();
router.post("/generate", dmController_1.generateDM);
exports.default = router;
