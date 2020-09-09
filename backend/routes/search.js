const search = require("express").Router();
const { searchByGenre } = require("../queries/searchQueries");

search.get("/:genre", searchByGenre);

module.exports = search;