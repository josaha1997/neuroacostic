const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model("Language", LanguageSchema, "Language");

exports.Language = Language;
