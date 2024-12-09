import express from "express";
import {
  userSignUp,
  userSignIn,
  userInfo,
} from "../controllers/usersController.js";
import verifyToken from "../auths/tokenAuth.js";

const router = express.Router();

// sign-up
router.post("/signup", userSignUp);

// sign-in
router.post("/signin", userSignIn);

// user-info
router.get("/user-info", verifyToken, userInfo);

export default router;
