var TestWallet = artifacts.require("./TestWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(TestWallet);
};
