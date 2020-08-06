const mongoose = require("mongoose");

const UserResultSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    audio_name: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Audio',
        required: true
    },
    brainwaveData: {
        type: mongoose.Schema.Types.ObjectId, ref: 'BrainwaveData',
        required: true
    },

    mood_impact: {
        type: String,
        enum: ['positive', 'negative', 'neutral', 'no impact'],
        required: true
    }
});


const UserResult = mongoose.model("UserResult", UserResultSchema);

exports.UserResult = UserResult;
