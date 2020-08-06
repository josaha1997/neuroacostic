const { UserQuestion } = require("../models/userQuestions");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  if (!req.body.question || !req.body.question.length)
    res.status(400).send("No data provided");
  else {
    await User.find({ _id: res.locals.user }, async function (err, user) {
      if (err) res.status(401).send(err.message);
      else {
        const question = new UserQuestion({
          user_name: res.locals.user,
          question: req.body.question,
          description: req.body.description,
        });
        try {
          await question.save();
          res.send("Query successfully sent");
        } catch (err) {
          res.status(404).send(err.message);
        }
      }
    });
  }
});
module.exports = router;
