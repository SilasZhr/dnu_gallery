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
    expect(await dnu.connect(account2).checkMembers(account2.address));


    const tx = await dnu.connect(account1).addMembers([account1.address, account2.address]);

    console.log(await dnu.connect(account1).checkMembers(account1.address));

    console.log([account1.address, account2.address]);
    expect(await dnu.connect(account1).checkMembers(account1.address));
    expect(await dnu.connect(account2).checkMembers(account2.address));
  })

  it("0 NFT is minted successfully", async function () {
    [account1] = await ethers.getSigners();

    console.log(await dnu.connect(account1).checkMembers(account1.address));
    expect(await dnu.balanceOf(account1.address)).to.equal(0);

    const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tx = await dnu.connect(account1).mintZero(tokenURI);

    expect(await dnu.balanceOf(account1.address)).to.equal(1);
  })


  it("NFT is minted successfully", async function () {
    [account1, account2] = await ethers.getSigners();

    expect(await dnu.balanceOf(account1.address)).to.equal(0);

    const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tx = await dnu.connect(account1).mint(tokenURI);

    expect(await dnu.balanceOf(account1.address)).to.equal(1);
  })

  it("NFT is set sucessfully", async function () {
    [account1, account2] = await ethers.getSigners();

    // const tokenURI_1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
    const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2"

    // const tx1 = await dnu.connect(account1).mint(tokenURI_1);
    const tx2 = await dnu.connect(account2).mint(tokenURI_2);

    // expect(await dnu.tokenURI(0)).to.equal(tokenURI_1);
    expect(await dnu.tokenURI(1)).to.equal(tokenURI_2);
  })

})
