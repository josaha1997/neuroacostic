const { Singer } = require("../models/singers");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.get("/", (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  Promise.all([
    User.find({ _id: res.locals.user }).select("singers -_id").exec(), // returns a promise
    Singer.find().select("name -_id").exec(), // returns a promise
  ])
    .then(function (results) {
      // results is [devDocs, jobs]
      if (results) res.send(results);
      if (!results) res.status(404).send("User not found");
    })
    .catch(function (err) {
      res.status(400).send(err.message);
    });
});

module.exports = router;
