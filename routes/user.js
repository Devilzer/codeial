const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");
const postsController = require("../controllers/post_controller");

router.get("/", (req, res) => {
  res.end("<h1>This is user controller</h1>");
});
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.post("/create-user", userController.createUser);
router.get("/sign-out", userController.terminateSession);

//use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "sign-in" }),
  userController.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);

module.exports = router;
