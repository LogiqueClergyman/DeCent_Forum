const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Comments", function () {
  it("Should add and get comments successfully", async function () {
    const Comments = await hre.ethers.deployContract(
      "contracts/comments.sol:Comments"
    );
    const comment = await Comments.waitForDeployment();

    expect(await comment.getComments("first example topic")).to.be.lengthOf(0);

    await comment.addComment("first example topic", "first comment");

    expect(await comment.getComments("first example topic")).to.be.lengthOf(1);
    expect(await comment.getComments("second example topic")).to.be.lengthOf(0);
  });
});
