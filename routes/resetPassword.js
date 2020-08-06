const { User } = require("../models/user");
const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

//const { verifyAuthToken } = require("../startup/verifyAuthToken");
const { sendMail } = require("../startup/sendMail");

router.post("/:token", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  const subject = "Password Reset Complete";
  const text = "You have successfully reset your password";
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  jwt.verify(req.params.token, config.get("jwtPrivateKey"), async function (
    err,
    decoded
  ) {
    if (err) {
      return res.status(401).send("Token expired or Invalid token");
    } else {
      const user = await User.findOneAndUpdate(
        { email: decoded.email, passwordResetToken: req.params.token },
        {
          $set: { password: req.body.password },
          $unset: { passwordResetToken: "undefined" },
        },
        async function (err, user) {
          if (err) {
            return res.status(401).send("Unauthorized user");
          } else if (!user) {
            return res.status(404).send("User not found");
          } else {
            try {
              const result = await sendMail(decoded.email, subject, text);
              return res.send("Password updated");
            } catch (err) {
              return res
                .status(500)
                .send(
                  "Password updated. Could not send confirmation mail due to server error :" +
                    err.message
                );
            }
          }
        }
      );
    }
  });
});
module.exports = router;
