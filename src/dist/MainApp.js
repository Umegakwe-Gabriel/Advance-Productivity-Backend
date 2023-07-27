"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const taskRouter_1 = __importDefault(require("./router/taskRouter"));
const stepRouter_1 = __importDefault(require("./router/stepRouter"));
const progressRouter_1 = __importDefault(require("./router/progressRouter"));
const doneRouter_1 = __importDefault(require("./router/doneRouter"));
const mainApp = (app) => {
    app
        .use((0, cors_1.default)())
        .use(express_1.default.json())
        .use("/api/v1/auth", authRouter_1.default)
        .use("/api/v1/task", taskRouter_1.default)
        .use("/api/v1/step", stepRouter_1.default)
        .use("/api/v1/progress", progressRouter_1.default)
        .use("/api/v1/done", doneRouter_1.default)
        .get("/", (req, res) => {
        try {
            return res.status(200).json({ message: "Awesome and good to GO!!!!!" });
        }
        catch (error) {
            return res.status(404).json({ message: "Error found" });
        }
    });
};
exports.mainApp = mainApp;
