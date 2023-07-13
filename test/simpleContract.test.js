const { expect } = require("chai");

describe("SimpleContract", function(){
  let SimpleContract;
  let simpleContract;

  beforeEach(async function () {
    SimpleContract = await ethers.getContractFactory("SimpleContract");
    simpleContract = await SimpleContract.deploy(42);
    await simpleContract.deployed();
  });

  it("should have an initial value of 42", async function () {
    expect(await simpleContract.value()).to.equal(42);
  });

//   it("should set a new value correctly", async function () { //executes if condition true 
//     //await simpleContract.setValue(100);
//     expect(await simpleContract.value()).to.equal(100); //condition
//   });
  //  it("should set a new value correctly", )
});
