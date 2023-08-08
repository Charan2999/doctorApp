const mongoose = require("mongoose");

//db connection
const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongodb connected successfully"))
    .catch((error) => console.log("error in connecting to mongodb", error));
};

module.exports = { connectDB };
