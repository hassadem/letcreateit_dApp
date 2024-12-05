const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const LetCreateItModule = buildModule("LetCreateItModule", (m) => {
  // Replace "MemeTokenFactory" with your contract's name
  const factory = m.contract("LetCreateItFactory");

  return { factory };
});

module.exports = LetCreateItModule;
