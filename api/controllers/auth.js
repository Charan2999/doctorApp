const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const DoctorModel = require("../models/Doctor");
const { connectDB } = require("../config/db");

const login = async (req, res) => {
  connectDB();
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(400)

        .json({ success: false, msg: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "user not found please try register" });
    }
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      return res
        .status(400)
        .json({ success: false, msg: "password doent matchup!!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.cookie("token", token, { httpOnly: true }); //set token into cookie
    return res
      .status(200)
      .json({ success: true, msg: "login succesful", user, token });
  } catch (error) {
    console.log("error in login controller", error);
    res.status(500).json({ success: false, msg: "error in login controller" });
  }
};

const register = async (req, res) => {
  connectDB();
  try {
    const { name, email, password } = req.body;
    if (!(email && name && password)) {
      return res
        .status(400)
        .json({ success: false, msg: "all the fields are required" });
    }
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res
        .status(200)
        .json({ success: false, msg: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, msg: "Register succesfully!!", newUser });
  } catch (error) {
    console.log("error in register controller", error);
    res
      .status(500)
      .json({ success: false, msg: "error in register controller" });
  }
};

const authController = async (req, res) => {
  connectDB();
  try {
    const user = await User.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        success: false,
        msg: "user not found",
      });
    } else {
      const { password, ...userDetails } = user._doc;
      res.status(200).send({
        success: true,
        msg: "user verified",
        data: userDetails,
      });
    }
  } catch (error) {
    console.log("error in auth controller", error);
    res.status(500).send({
      success: false,
      msg: "auth error",
    });
  }
};

const applyDoctorController = async (req, res) => {
  connectDB();
  try {
    const newDoctor = await DoctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUsers = await User.find({ isAdmin: true });
    adminUsers.forEach((adminUser) => {
      const notification = adminUser.notification;
      notification.push({
        type: "apply doctor request",
        msg: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
        data: {
          doctorId: newDoctor._id,
          userId: req.body.userId,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });
      // Update the adminUser with the modified notification property
      adminUser.notification = notification;
    });

    res.status(201).send({
      success: true,
      msg: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log("error in applyDocController", error);
    res
      .status(500)
      .send({ success: false, msg: "error in apply doc controller" });
  }
};

//notifications
const notificationsController = async (req, res) => {
  connectDB();
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      msg: "all notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log("error in notifications controller", error);
    res.status(500).send({
      success: false,
      msg: "error in notifications",
    });
  }
};
// delete notifications
const deleteNotificationsController = async (req, res) => {
  connectDB();
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });
    user.notification = [];
    user.seenNotification = [];
    const { password, ...userDetails } = await user.save();
    res.status(200).send({
      success: true,
      msg: "Notifications deleted successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log("error in delete all notifications controller", error);
    res.status(500).send({
      success: false,
      msg: "error in deleteing all the notifications",
    });
  }
};

module.exports = {
  login,
  register,
  authController,
  applyDoctorController,
  notificationsController,
  deleteNotificationsController,
};
