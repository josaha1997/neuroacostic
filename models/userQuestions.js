const mongoose = require("mongoose");

const UserQuestionSchema = new mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: { type: String, required: true },
  description: { type: String, required: true },
});

const UserQuestion = mongoose.model(
  "UserQuestion",
  UserQuestionSchema,
  "UserQuestion"
);

exports.UserQuestion = UserQuestion;
