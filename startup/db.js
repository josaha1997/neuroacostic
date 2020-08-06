const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.info(`Connected to DB...`);
      console.log("Connected");
    })
    .catch((err) => {
      winston.info(`Connected to DB...`);
      console.log(err.message);
    });
};
