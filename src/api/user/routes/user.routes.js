import express from "express";
import { checkAuth } from "../../../middlewares/checkAuth.js";
import {
  createUser,
  loginUser,
  profile,
  sayHi,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", sayHi);
router.post("/account/sign-up", createUser);
router.post("/account/sign-in", loginUser);
router.get("/profile", checkAuth, profile);

export default router;
