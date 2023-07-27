"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doneSchema = new mongoose_1.default.Schema({
    assignedName: {
        type: String,
    },
    assignedTask: {
        type: String,
    },
    assignedPriority: {
        type: String,
    },
    assignedAvatar: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("dones", doneSchema);
