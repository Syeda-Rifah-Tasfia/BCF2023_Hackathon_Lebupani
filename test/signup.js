const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SignUp", function () {
  let signUp;
  let owner;
  let userAddress;

  beforeEach(async function () {
    const SignUp = await ethers.getContractFactory("SignUp");
    signUp = await SignUp.deploy();
    [owner] = await ethers.getSigners();
    userAddress = await owner.getAddress();
  });

  it("should register a new user", async function () {
    const name = "John Doe";

    await signUp.signUp(name);

    const user = await signUp.users(userAddress);

    expect(user.name).to.equal(name);
    expect(user.userAddress).to.equal(userAddress);
    expect(user.timestamp).to.not.be.undefined;
  });

  it("should not allow registration with an empty name", async function () {
    const name = "";

    await expect(signUp.signUp(name)).to.be.revertedWith("Name should not be empty");
  });

  it("should not allow registration if user is already registered", async function () {
    const name = "Jane Smith";

    await signUp.signUp(name);

    await expect(signUp.signUp(name)).to.be.revertedWith("User already registered");
  });
});
