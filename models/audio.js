const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  singers: [
    {
      type: String,
      required: true,
    },
  ],
  genres: [
    {
      type: String,
      required: true,
    },
  ],
});

const Audio = mongoose.model("Audio", audioSchema, "Audio");

exports.Audio = Audio;
