const { UserQuestion } = require("../models/userQuestions");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.get("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  await User.findById({ _id: res.locals.user }, async function (err, user) {
    if (err) res.stauts(400).send(err.message);
    else if (user) {
      console.log(user);
      if (user.role === "admin") {
        try {
          const questions = await UserQuestion.find()
            .populate("user_name", "email -_id")
            .sort("-_id")
            .limit(20)
            .select("-_id");
          if (!questions) res.status(404).send("No questions found");
          else res.send(questions);
        } catch (err) {
          res.status(400).send(err.message);
        }
      } else {
        res.status(403).send("Forbidden");
      }
    } else res.status(404).send("User not found");
  });
});
module.exports = router;
