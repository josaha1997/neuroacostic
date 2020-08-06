const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.get("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  console.log(res.locals.user);
  try {
    let user = await User.find({ _id: res.locals.user }).select(
      "name email dateofBirth gender -_id"
    );
    if (user) res.send(user);
    else res.status(404).send("No Profile found");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
