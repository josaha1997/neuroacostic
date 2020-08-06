const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  let user = await User.findOne({ _id: res.locals.user });
  if (!user) return res.status(401).send("Invalid user");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send("Invalid password.");

  const salt = await bcrypt.genSalt(10);
  req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
  await User.update(
    { _id: res.locals.user },
    { $set: { password: req.body.newPassword } },
    function (err, result) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (result) {
        let token = user.generateAuthToken();
        res.send(token);
      } else res.status(500).send("could not update");
    }
  );
});

module.exports = router;
