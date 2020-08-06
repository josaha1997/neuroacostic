const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  let user = await User.findOne({ _id: res.locals.user });
  if (!user) return res.status(401).send("Invalid token.");
  var objForUpdate = {};
  if (req.body.name) objForUpdate.name = req.body.name;
  if (req.body.dateofBirth) objForUpdate.dateofBirth = req.body.dateofBirth;
  if (req.body.gender) objForUpdate.gender = req.body.gender;
  await User.updateOne(
    { _id: res.locals.user },
    { $set: objForUpdate },
    async function (err, result) {
      if (err) {
        res.status(400).send(err.message);
        return;
      } else if (result) {
        res.send("updated");
      } else res.status(500).send("could not update");
    }
  );
});

module.exports = router;
