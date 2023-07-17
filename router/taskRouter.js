"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controller/taskController");
const router = express_1.default.Router();
router.route("/:id/create-task").post(taskController_1.createTask);
router.route("/view-tasks").get(taskController_1.readTask);
router.route("/:id/delete-task").delete(taskController_1.deleteTask);
exports.default = router;
