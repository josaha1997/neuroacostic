const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  let user = await User.findOne({ _id: res.locals.user });
  if (!user) return res.status(401).send("Invalid email.");

  await user.updateOne(
    { _id: res.locals.user },
    { $set: { token: req.body.token } },
    async function (err, result) {
      if (err) {
        res.send(err.message);
        return;
      } else {
        res.send("updated");
      }
      await user.save();
    }
  );
});

module.exports = router;
