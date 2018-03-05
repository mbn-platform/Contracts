// let MembranaInstance = artifacts.require("./MembranaInstance.sol");
let MembranaDeals = artifacts.require("./MembranaDeals.sol");

module.exports = function(deployer) {
  // deployer.deploy(MembranaInstance);
  // deployer.deploy(MembranaFactory);
  // deployer.link(MembranaInstance, MembranaFactory);
  deployer.deploy(MembranaDeals);
};
