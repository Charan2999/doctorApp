const jwt = require("jsonwebtoken");
require("dotenv").config();
const connectDB = require("../config/db");

module.exports = async (req, res, next) => {
  // connectDB();
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
      if (error) {
        return res.status(200).send({
          success: false,
          msg: "Auth failed",
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log("error in auth middleware", error);
    res.status(404).send({
      success: false,
      msg: "Auth failed",
    });
  }
};
