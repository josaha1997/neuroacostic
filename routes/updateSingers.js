const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  if (!req.body.singers || !req.body.singers.length)
    res.status(400).send("No data provided");
  else {
    await User.findOne({ _id: res.locals.user }, async function (err, user) {
      if (err) res.status(400).send(err.message);
      else if (!user) response.status(401).send("Invalid user");
      else {
        try {
          await User.updateOne(
            { _id: res.locals.user },
            { $set: { singers: req.body.singers } }
          );
          res.send("updated");
        } catch (err) {
          res.status(400).send(err.message);
        }
      }
    });
  }
});

module.exports = router;
