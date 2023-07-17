import express, {Router} from "express"
import { createUser, deleteOneUser, readOneUser, readUsers, signinUser, updateOneUser } from "../controller/authController";


const router: Router = express.Router();

router.route("/all-users").get(readUsers);
router.route("/:id/get-one-user").get(readOneUser);
router.route("/:id/update-users").patch(updateOneUser);
router.route("/:id/delete-users").delete(deleteOneUser);
router.route("/register").post(createUser);
router.route("/sign-in").post(signinUser)

export default router