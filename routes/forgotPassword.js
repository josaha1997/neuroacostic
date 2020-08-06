const { User } = require("../models/user");
const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");
const { sendMail } = require("../startup/sendMail");

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  let token = jwt.sign({ email: req.body.email }, config.get("jwtPrivateKey"), {
    expiresIn: "10m", // expires in 10 mins
  });
  const subject = "Neuro Acostic Password Reset";
  const link =
    "https://frozen-springs-58227.herokuapp.com/resetPassword.html?token=" +
    token;
  const text =
    "You are receiving this mail because we received a password reset request from you. Please click on the link to reset your password:<br><a href=" +
    link +
    ">" +
    link +
    "</a><br> The link expires in 10 minutes.<br>Please ignore if already done.";
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { passwordResetToken: token } },
    async function (err, user) {
      if (err) res.status(400).send(err.message);
      else {
        try {
          const result = await sendMail(user.email, subject, text);
          res.send(result);
        } catch (e) {
          res.status(400).send(e.message);
        }
      }
    }
  );
});
module.exports = router;
