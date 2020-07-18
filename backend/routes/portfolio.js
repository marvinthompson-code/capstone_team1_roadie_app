const portfolio = require("express").Router();
const {getAllPortfolio, singleMedia, addNewMedia} = require("../queries/portfolioQueries");

portfolio.get("/", getAllPortfolio);
portfolio.get("/:id", singleMedia);
portfolio.post("/", addNewMedia);


module.exports = portfolio;