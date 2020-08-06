const { BrainWaveData } = require("../models/BrainWaveData");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.get("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  try {
    let mood = await BrainWaveData.find({
      user_name: res.locals.user,
      "session.start_time": new Date(req.headers.start_time),
    }).select("session.mood -_id");
    if (mood.length) res.send(mood);
    else res.status(404).send("No mood found");
  } catch (err) {
    res.status(400).send(err.message);
  }
  // }
});

module.exports = router;
