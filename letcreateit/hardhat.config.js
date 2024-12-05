require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.27",
    networks: {
        baseSepolia: {
            url: "https://sepolia.base.org", // Replace with Base RPC URL
            accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: {
          baseSepolia: "7ZA9DIDC6Z6XKXJI79GHIB7JRNSAANUMH4", // API key from .env
        },
      },
};
