const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: false,
  },
  headset: {
    type: String,
    required: false,
  },
  passwordResetToken: {
    type: String,
    required: false,
  },
  languages: [
    {
      type: String,
      required: false,
    },
  ],
  genres: [
    {
      type: String,
      required: false,
    },
  ],
  singers: [
    {
      type: String,
      required: false,
    },
  ],
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    dateofBirth: Joi.date().max("2010-1-1").required(),
    gender: Joi.string().required(),
    headset: Joi.string().optional().default("Emotive Insight"),
    languages: Joi.array().items(Joi.string()).optional(),
    singers: Joi.array().items(Joi.string()).optional(),
    genres: Joi.array().items(Joi.string()).optional(),
    role: Joi.string().optional(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
