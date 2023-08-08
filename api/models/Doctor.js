const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: Number,
      required: [true, "experience is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    fee: {
      type: Number,
      required: [true, "fee is required"],
    },
    timings: {
      type: Object,
      required: [true, "first name is required"],
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

const DoctorModel = mongoose.model("doctors", DoctorSchema);

module.exports = DoctorModel;
