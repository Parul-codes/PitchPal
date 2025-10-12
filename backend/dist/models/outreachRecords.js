"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OutreachRecordSchema = new mongoose_1.Schema({
    brandName: { type: String, required: true },
    platform: { type: String, default: 'Instagram' },
    status: { type: String, default: 'Sent' },
    dmSentDate: { type: Date, default: Date.now },
    responseDate: { type: Date },
    notes: { type: String },
    responseReceived: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)('OutreachRecord', OutreachRecordSchema);
