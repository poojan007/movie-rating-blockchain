var MovieRating = artifacts.require("MovieRating");

module.exports = function(deployer) {
  deployer.deploy(MovieRating, ["Sky Fall"]);
};