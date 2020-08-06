var unirest = require("unirest");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  var request = unirest(
    "GET",
    "https://deezerdevs-deezer.p.rapidapi.com/search"
  );
  request.query({
    q: req.headers.string,
  });

  request.headers({
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "f19aa2d6e1msh75fe16c0daf2b83p12c791jsn5a776f423e8f",
    useQueryString: true,
  });

  request.end(function (response) {
    if (response.error) res.status(400).send(new Error(response.error));
    else res.send(response.body);
  });
});

module.exports = router;
