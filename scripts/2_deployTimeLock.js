const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying governance contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // TimeLock values
  //const MIN_DELAY = 3600; // 1 hour (after a vote passes, you have 1 hour before you can enact)
  const MIN_DELAY = 60;
  const proposers = [];
  const executors = [];
  
  // Deploy TimeLock
  console.log("Deploying TimeLock...");
  const TimeLock = await ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy(
    MIN_DELAY,
    proposers,
    executors,
    deployer.address // Admin
  );
  await timeLock.deploymentTransaction().wait();
  const timeLockAddress = timeLock.target;
  console.log("TimeLock deployed to:", timeLockAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 