const express = require("express");
const auth = require("../middlewares/auth");
const {
  getAllUsers,
  getAllDoctors,
  changeDoctorStatus,
} = require("../controllers/adminAuth");

const router = express.Router();

// get users
router.get("/getAllUsers", auth, getAllUsers);

//get doctors
router.get("/getAllDoctors", auth, getAllDoctors);

// doc status
router.post("/changeDoctorStatus", auth, changeDoctorStatus);

module.exports = router;
