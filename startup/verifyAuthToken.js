const config = require("config");
const jwt = require("jsonwebtoken");

function verifyAuthToken(token) {
  return jwt.verify(token, config.get("jwtPrivateKey"), function (
    err,
    decoded
  ) {
    if (err) return err;
    return decoded._id;
  });
}
module.exports.verifyAuthToken = verifyAuthToken;
