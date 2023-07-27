import {Router} from "express";
import { deleteProgressStep, doneCreateUser, readDoneUsers, readOneDoneUser } from "../controller/doneController";

const doneRouter = Router();

doneRouter.route("/read").get(readDoneUsers);
doneRouter.route("/:id/read-one").get(readOneDoneUser);
doneRouter.route("/done-task").post(doneCreateUser)
doneRouter.route("/:progressId/:progressStepId/delete-progress-step").delete(deleteProgressStep)

export default doneRouter;