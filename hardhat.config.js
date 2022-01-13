require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
task("deploy", "Deploy the smart contracts", async (taskArgs, hre) => {

  const Artwork = await hre.ethers.getContractFactory("Dnu");
  const artwork = await Artwork.deploy("Digital New Union", "DNU");

  await artwork.deployed();

  // await hre.run("verify:verify", {
  //   address: artwork.address,
  //   constructorArguments: [
  //     "Artwork Contract",
  //     "ART"
  //   ]
  // })
})
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.ETH_RINKEBY_PROVIDER,
      accounts: [
        process.env.PRIVATE_KEY,
      ]
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_KEY,
    }
  }
};
