require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  }, 
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: process.env.SEPOLIA_URL, // Alchemy 的 Sepolia 测试网 URL
      accounts: [process.env.PRIVATE_KEY], // 部署账户的私钥
    },  
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },  
};
