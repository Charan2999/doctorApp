const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3000","https://lighthearted-puppy-57b248.netlify.app"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieparser());
app.use(express.json());

const PORT = process.env.PORT;

//routes
app.use("/api/auth", userRoutes);
app.use("/api/auth/admin", adminRoutes);

// app.use(express.static(path.join(__dirname, "../client/biuld")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });
//connect db
// const connectDB = () => {
//   return mongoose
//     .connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("mongodb connected successfully"))
//     .catch((error) => console.log("error in connecting to mongodb", error));
// };
// connectDB();

mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongodb connected successfully"))
    .catch((error) => console.log("error in connecting to mongodb", error));

//listening port
app.listen(PORT, () => {
  console.log(
    `listening in ${process.env.DEV_MODE} mode server on port :${PORT}`
  );
});
