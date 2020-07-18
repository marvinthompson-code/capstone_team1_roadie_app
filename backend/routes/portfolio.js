const portfolio = require("express").Router();
const {getAllPortfolio, singleMedia} = require("../queries/portfolioQueries");

portfolio.get("/", getAllPortfolio);
portfolio.get("/:id", singleMedia);


module.exports = portfolio;