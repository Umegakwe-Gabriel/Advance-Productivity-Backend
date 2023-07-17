import express, {Router} from "express";
import { createStep, deleteStep, readOneStep, readSteps, readTask, updateOneStep } from "../controller/stepController";


const router: Router = express.Router();

router.route("/:id/create-step").post(createStep);

router.route("/:id/view-tasks").get(readTask);

router.route("/:id/view-step").get(readSteps);

router.route("/:id/view-one-step").get(readOneStep);

router.route("/:id/update-one-step").patch(updateOneStep);

router.route("/:taskID/:stepID/delete-step").delete(deleteStep);

export default router;