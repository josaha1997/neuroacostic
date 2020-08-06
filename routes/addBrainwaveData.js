const { BrainWaveData } = require("../models/BrainWaveData");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.session || !req.body.session.length)
    res.status(400).send("No data provided");
  else {
    await User.findById({ _id: res.locals.user }, async function (err, user) {
      if (err) res.status(400).send(err.message);
      if (user) {
        try {
          await BrainWaveData.updateOne(
            { user_name: res.locals.user },
            { $push: { session: { $each: req.body.session } } },
            { upsert: true }
          );
          res.send("Successfully updated data");
        } catch (err) {
          res.status(400).send(err.message);
        }
      } else {
        res.status(404).send("User doest not exists");
      }
    });
  }
});

module.exports = router;
