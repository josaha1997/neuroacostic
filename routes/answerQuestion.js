const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");
const { sendMail } = require("../startup/sendMail");

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  const email = req.body.email;
  const subject = "NeuroAcostic:Reply to your query";
  const text = req.body.text;
  if (!req.body.text || !req.body.text.length)
    res.status(400).send("No data provided");
  else {
    await User.findById({ _id: res.locals.user }, async function (err, user) {
      if (err) res.status(400).send("User does not exists");
      if (user) {
        console.log(user.role);
        if (user.role === "admin") {
          try {
            const result = await sendMail(email, subject, text);
            res.send(result);
          } catch (err) {
            res.status(400).send(err.message);
          }
        } else {
          res.status(403).send("Forbidden");
        }
      } else res.status(404).send("user not found");
    });
  }
});
module.exports = router;
