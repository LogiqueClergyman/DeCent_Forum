const hre = require("hardhat");

async function main() {
  const Comments = await hre.ethers.deployContract(
    "contracts/comments.sol:Comments"
  );
  const comment = await Comments.waitForDeployment();
  console.log("Deploying Contract...");
  console.log("Greeter deployed to:", await comment.getAddress());
  await comment.addComment("first example topic", "first comment");

  await comment.addComment("first example topic", "second comment");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
