const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    jwt.verify(token, config.get("jwtPrivateKey"), function (err, decoded) {
      if (err) res.status(404).send(err.message);
      res.locals.user = decoded._id;
    });
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};
