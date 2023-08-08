const Doctor = require("../models/Doctor");
const User = require("../models/User");
const { connectDB } = require("../config/db");

const getAllUsers = async (req, res) => {
  connectDB();
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      msg: "users data",
      data: users,
    });
  } catch (error) {
    console.log("error in getting users", error);
    res.status(500).send({
      success: false,
      msg: "error while getting users",
      error,
    });
  }
};
const getAllDoctors = async (req, res) => {
  connectDB();
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      success: true,
      msg: "doctors data",
      data: doctors,
    });
  } catch (error) {
    console.log("error in getting doctors", error);
    res.status(500).send({
      success: false,
      msg: "error while getting doctors",
      error,
    });
  }
};

const changeDoctorStatus = async (req, res) => {
  connectDB();
  try {
    const doctorId = req.body._id;
    const userId = req.body.userId;
    console.log(userId);
    const status = req.body.status;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
    const user = await User.findById({ _id: userId });
    const notification = user.notification;
    notification.push({
      type: "update-on-doctor-account-request",
      msg: `Your Doctor Account has been ${status}`,
      onClickPath: "/notification",
    });
    doctor.status === "approved"
      ? (user.isDoctor = true)
      : (user.isDoctor = true);

    await user.save();
    await doctor.save();
    res.status(200).send({
      success: true,
      msg: "Account status updated",
      data: doctor,
    });
  } catch (error) {
    console.log("error in chganging status", error);
    res.status(500).send({
      success: false,
      msg: "Error in chnaging Doctor status",
      error,
    });
  }
};

module.exports = { getAllDoctors, getAllUsers, changeDoctorStatus };
