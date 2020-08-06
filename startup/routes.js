const express = require("express");
const users = require("../routes/registration");
const auth = require("../routes/login");
const updateHeadsetName = require("../routes/updateHeadsetName");
const addBrainwaveData = require("../routes/addBrainwaveData");
const updateLangauges = require("../routes/updateLangauges");
const updateSingers = require("../routes/updateSingers");
const updateGenres = require("../routes/updateGenres");
const updatePassword = require("../routes/updatePassword");
const updateProfile = require("../routes/updateProfile");
const updateToken = require("../routes/updateToken");
const askQuestion = require("../routes/askQuestion");
const answerQuestion = require("../routes/answerQuestion");
const logout = require("../routes/logout");
const getProfile = require("../routes/getProfile");
const getMood = require("../routes/getMood");
const getGenres = require("../routes/getGenres");
//const getAudios = require("../routes/getAudios");*/
const getLanguages = require("../routes/getLanguages");
const getSingers = require("../routes/getSingers");
const getUserQuestion = require("../routes/getUserQuestion");
const forgotPassword = require("../routes/forgotPassword");
const resetPassword = require("../routes/resetPassword");
const getSongs = require("../routes/getSongs");
//const addHeadset = require('../routes/addHeadset');
const authToken = require("../middleware/auth");
const error = require("../middleware/error");
var bodyParser = require("body-parser");

var unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => {
      var p = path.split(":");
      if (p.length) return req.path.includes(p[0]);
      else return path === req.path;
    });
    pathCheck ? next() : middleware(req, res, next);
  };
};
module.exports = function (app) {
  app.use(express.json());
  app.use(
    unless(
      authToken,
      "/api/login",
      "/api/registration",
      "/api/forgotPassword",
      "/api/resetPassword/:token",
      "/api/getSongs",
      "/resetPassword.html"
    )
  );
  //For users
  app.use("/api/resetPassword/:token", bodyParser.json());
  app.use("/api/registration", users);
  app.use("/api/login", auth);
  app.use("/api/updateHeadsetName", updateHeadsetName);
  app.use("/api/addBrainwaveData", addBrainwaveData);
  app.use("/api/updateLanguages", updateLangauges);
  app.use("/api/updateSingers", updateSingers);
  app.use("/api/updateGenres", updateGenres);
  app.use("/api/updatePassword", updatePassword);
  app.use("/api/updateProfile", updateProfile);
  app.use("/api/updateToken", updateToken);
  app.use("/api/askQuestion", askQuestion);
  app.use("/api/answerQuestion", answerQuestion);
  app.use("/api/logout", logout);
  app.use("/api/getProfile", getProfile);
  app.use("/api/getMood", getMood);
  app.use("/api/getGenres", getGenres);
  //app.use("/api/getAudios", getAudios);*/
  app.use("/api/getLanguages", getLanguages);
  app.use("/api/getSingers", getSingers);
  app.use("/api/getUserQuestion", getUserQuestion);
  app.use("/api/forgotPassword", forgotPassword);
  app.use("/api/resetPassword", resetPassword);
  app.use("/api/getSongs", getSongs);
  //For admin only
  //app.use('/api/addHeadset', addHeadset);

  app.use(error);
};
