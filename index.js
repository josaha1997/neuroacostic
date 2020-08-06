const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);
app.use(express.static("./public"));
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`port ${port}`);
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
