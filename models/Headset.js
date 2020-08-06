const mongoose = require("mongoose");

const HeadsetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  moodwiseBrainwaveValues: [
    {
      mood: {
        type: String,
        required: true,
      },
      Delta_wave_low: {
        type: Number,
        required: true,
      },
      Delta_wave_high: {
        type: Number,
        required: true,
      },
      Theta_wave_low: {
        type: Number,
        required: true,
      },
      Theta_wave_high: {
        type: Number,
        required: true,
      },
      Alpha_wave_low: {
        type: Number,
        required: true,
      },
      Alpha_wave_high: {
        type: Number,
        required: true,
      },
      Beta_wave_low: {
        type: Number,
        required: true,
      },
      Beta_wave_high: {
        type: Number,
        required: true,
      },
      Gamma_wave_low: {
        type: Number,
        required: trues,
      },
      Gamma_wave_high: {
        type: Number,
        required: trues,
      },
    },
  ],
});

const Headset = mongoose.model("Headset", HeadsetSchema, "Headset");

exports.Headset = Headset;
