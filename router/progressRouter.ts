import express, {Router} from "express"
import { createProgress, deleteProgress, readProgress, readProgressDetail } from "../controller/progressController";

const router: Router = express.Router();

router.route("/create-progress").post(createProgress);
router.route("/view-progress").get(readProgress)
router.route("/:id/view-progress-info").get(readProgressDetail)
router.route("/:id/delete-progress").delete(deleteProgress)

export default router;