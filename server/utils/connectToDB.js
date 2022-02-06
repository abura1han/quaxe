require("dotenv").config();

const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldpb3.mongodb.net/quaxe?retryWrites=true&w=majority`
  );
};

module.exports = connectToDB;
