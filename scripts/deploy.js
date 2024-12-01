const hre = require("hardhat");

async function main() {  
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Deployer balance:", ethers.utils.formatEther(balance), "ETH");
  
  const factory = await hre.ethers.getContractFactory("Greeter");
  console.log("Deploying contract factory...");

  // Deploy the contract
  const greeter = await factory.deploy("Hello, Hardhat!");

  // Wait for the deployment to be mined
  await greeter.deployed();

  console.log(
    `contract successfully deployed to ${greeter.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
