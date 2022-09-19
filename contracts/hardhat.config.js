require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
    solidity: "0.8.12",
    networks: {
        mumbai: {
            url: `Provider URL for mumbai Testnet`,
            accounts: ["Your Wallet Private Key"],
        },
    },
    etherscan: {
        apiKey: "Your etherscan API Key",
    },
}