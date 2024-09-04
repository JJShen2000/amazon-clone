var express = require("express");
var router = express.Router();

const { searchController } = require("../controllers/");

const { getSearchResult } = searchController;

router.get("/", getSearchResult);

module.exports = router;
