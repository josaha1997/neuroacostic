const { Language } = require("../models/languages");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
//const { verifyAuthToken } = require("../startup/verifyAuthToken");

router.get("/", (req, res) => {
  //const id = verifyAuthToken(req.headers.token);
  Promise.all([
    User.find({ _id: res.locals.user }).select("languages -_id").exec(), // returns a promise
    Language.find().select("name -_id").exec(), // returns a promise
  ])
    .then(function (results) {
      // results is [devDocs, jobs]
      //console.log(results);
      if (results) res.send(results);
      if (!results) res.status(404).send("user not found");
    })
    .catch(function (err) {
      res.status(400).send(err.message);
    });
});

module.exports = router;
