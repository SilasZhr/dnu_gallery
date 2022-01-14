const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DNU Smart Contract Tests", function () {

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const Dnu = await ethers.getContractFactory("Dnu");
    dnu = await Dnu.deploy("Digital New Union", "DNU");
  })

  it("Menbers is added successfully", async function () {
    [account1, account2] = await ethers.getSigners();

    expect(await dnu.connect(account1).checkMembers(account1.address));
    console.log(await dnu.connect(account1).checkMembers(account1.address));

    const tx = await dnu.connect(account1).addMembers([account1.address, account2.address]);

    console.log(await dnu.connect(account1).checkMembers(account1.address));
  })

  it("0 NFT is minted successfully", async function () {
    [account1] = await ethers.getSigners();

    expect(await dnu.balanceOf(account1.address)).to.equal(0);

    const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tx1 = await dnu.connect(account1).setZeroTokenURI(tokenURI);
    const tx2 = await dnu.connect(account1).mintZero();

    expect(await dnu.balanceOf(account1.address)).to.equal(1);
  })

  it("NFT is minted failingly", async function () {
    [account1, account2] = await ethers.getSigners();

    expect(await dnu.balanceOf(account2.address)).to.equal(0);

    const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tx1 = await dnu.connect(account1).addMembers([account1.address, account2.address]);
    const tx2 = await dnu.connect(account2).mint();
    const tx3 = await dnu.connect(account2).mint();

    expect(await dnu.balanceOf(account2.address)).to.equal(1);
  })

  it("NFT is minted more", async function () {
    [account1] = await ethers.getSigners();

    expect(await dnu.balanceOf(account1.address)).to.equal(0);

    const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tx1 = await dnu.connect(account1).mintMore();
    const tx2 = await dnu.connect(account1).mintMore();

    expect(await dnu.balanceOf(account1.address)).to.equal(2);
  })

})
