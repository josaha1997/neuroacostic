const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

var minuteFromNow = function () {
  var timeObject = new Date();
  timeObject.setMinutes(timeObject.getTime() + 5);
  return timeObject;
};

const BrainwaveDataSchema = new mongoose.Schema({
  user_name: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  headset: {
    type: String,
    default: "Insight",
    required: true,
  },

  session: [
    {
      audio_name: {
        type: Schema.Types.ObjectId,
        ref: "Audio",
        required: false,
      },

      start_time: {
        type: Date,
        default: new Date(),
        required: true,
      },
      end_time: {
        type: Date,
        default: minuteFromNow,
        required: true,
      },
      raw_data: [
        {
          Delta_wave: {
            type: Number,
            required: true,
          },
          Theta_wave: {
            type: Number,
            required: true,
          },
          Alpha_wave: {
            type: Number,
            required: true,
          },
          Beta_wave: {
            type: Number,
            required: true,
          },
          Gamma_wave: {
            type: Number,
            required: true,
          },
        },
      ],
      mood: {
        type: String,
        required: false,
      },
      mood_impact: {
        type: String,
        enum: ["positive", "negative", "neutral", "no impact"],
        required: false,
      },
      genres: [
        {
          type: Schema.Types.ObjectId,
          ref: "Genre",
          required: false,
        },
      ],
    },
  ],
});

const BrainwaveData = mongoose.model(
  "BrainwaveData",
  BrainwaveDataSchema,
  "BrainwaveData"
);

exports.BrainWaveData = BrainwaveData;
