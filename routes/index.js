var express = require("express");
const { simulate } = require("../controller/gamer/gamer.controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  simulate();
});

module.exports = router;
