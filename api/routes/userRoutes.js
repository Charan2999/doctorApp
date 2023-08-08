const express = require("express");

const {
  login,
  register,
  authController,
  applyDoctorController,
  notificationsController,
  deleteNotificationsController,
} = require("../controllers/auth");
const auth = require("../middlewares/auth");

const router = express.Router();

//routes
router.post("/login", login);
router.post("/register", register);

//auth
router.post("/getUserData", auth, authController);

//apply doctor
router.post("/applydoctor", auth, applyDoctorController);

//notifications
router.post("/getAllNotifications", auth, notificationsController);

router.delete("/deletAllNotifications", auth, deleteNotificationsController);

module.exports = router;
