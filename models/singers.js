const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const SingerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Singer = mongoose.model("Singer", SingerSchema, "Singer");

exports.Singer = Singer;
