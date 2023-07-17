"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const stepSchema = new mongoose_1.default.Schema({
    assignedTask: {
        type: String,
        require: true,
    },
    assignedName: {
        type: String,
    },
    asssignedPriority: {
        type: String,
    },
    assignedAvatar: {
        type: String
    },
    task: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "tasks",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("steps", stepSchema);
