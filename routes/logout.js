const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  let user = await User.findOne({ _id: res.locals.user });
  if (!user) return res.status(401).send("Invalid token.");

  await user.updateOne(
    { _id: res.locals.user },
    { $unset: { token: req.body.token } },
    async function (err, result) {
      if (err) {
        res.send(err.message);
        return;
      } else {
        res.send("logged out");
      }
      await user.save();
    }
  );
});

module.exports = router;
