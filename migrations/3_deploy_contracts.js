let MercatusInstance = artifacts.require("./MercatusInstance.sol");
let MercatusFactory = artifacts.require("./MercatusFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(MercatusInstance);
  deployer.deploy(MercatusFactory);
  deployer.link(MercatusInstance, MercatusFactory);
  deployer.deploy(MercatusFactory);
};
