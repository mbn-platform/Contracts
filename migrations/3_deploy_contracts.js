// let MercatusInstance = artifacts.require("./MercatusInstance.sol");
let MercatusDeals = artifacts.require("./MercatusDeals.sol");

module.exports = function(deployer) {
  // deployer.deploy(MercatusInstance);
  // deployer.deploy(MercatusFactory);
  // deployer.link(MercatusInstance, MercatusFactory);
  deployer.deploy(MercatusDeals);
};
