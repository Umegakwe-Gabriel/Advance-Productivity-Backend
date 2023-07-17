"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stepController_1 = require("../controller/stepController");
const router = express_1.default.Router();
router.route("/:id/create-step").post(stepController_1.createStep);
router.route("/:id/view-tasks").get(stepController_1.readTask);
router.route("/:id/view-step").get(stepController_1.readSteps);
router.route("/:id/view-one-step").get(stepController_1.readOneStep);
router.route("/:id/update-one-step").patch(stepController_1.updateOneStep);
router.route("/:taskID/:stepID/delete-step").delete(stepController_1.deleteStep);
exports.default = router;
