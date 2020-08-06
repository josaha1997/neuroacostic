const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ _id: res.locals.user });
  if (!user) return res.status(401).send("Invalid token.");
  let result = user.update(
    { _id: res.locals.user },
    { $set: { headset: req.body.headset } },
    function (err, result) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (result) res.send("updated");
      else res.status(500).send("could not update");
    }
  );
  await user.save();
});

module.exports = router;
