const mongoose = require("mongoose");
const dotenv = require("dotenv");
const conn = async () => {
  dotenv.config();
  const uri = process.env.MONGO_URI;

  try {
    // await mongoose.connect("mongodb://localhost:27017/clothing");
    await mongoose.connect(uri);
    console.log("database started");
  } catch (e) {
    console.log(e);
  }
};

module.exports = conn();
