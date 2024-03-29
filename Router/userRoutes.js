const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

// Auth Controller
router.post("/signup", authController.signup);
router.post("/signup/phone", authController.signupPhone);
router.post("/login", authController.login);
router.post("/admin-login", authController.adminLogin);
router.get("/google/login", authController.googleLogin);
router.get("/admin/google/login", authController.googleLoginAdmin);
router.get("/facebook/login", authController.facebookLogin);
router.get("/admin/facebook/login", authController.facebookLoginAdmin);
router.get("/logout", authController.logout);
router.get("/loaduser", authController.protect, authController.loadUser);

// User Controller
router.get("/resendEmail", authController.protect, authController.resendEmail);

router.post(
  "/confirmEmail",
  authController.protect,
  authController.confirmEmail,
);

router.post("/resendPhone", authController.protect, authController.resendPhone);

router.post(
  "/confirmPhone",
  authController.protect,
  authController.confirmPhone,
);

router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword", authController.resetPassword);

// User Controller
router.get(
  "/",
  authController.protect,
  authController.isAdmin,
  userController.getAllUsers,
);

router.post(
  "/add/admin",
  authController.protect,
  authController.isMainAdmin,
  userController.addAdmin,
);

router.post(
  "/delete/admin",
  authController.protect,
  authController.isMainAdmin,
  userController.deleteAdmin,
);

router.post(
  "/block/one",
  authController.protect,
  authController.isAdmin,
  userController.blockUser,
);
router.post(
  "/unblock/one",
  authController.protect,
  authController.isAdmin,
  userController.unblockUser,
);

router.post("/update/me", authController.protect, userController.updateMe);

router.post(
  "/update/password",
  authController.protect,
  userController.updatePassword,
);

router.get(
  "/:id",
  authController.protect,
  authController.isAdmin,
  userController.getUser,
);

module.exports = router;
