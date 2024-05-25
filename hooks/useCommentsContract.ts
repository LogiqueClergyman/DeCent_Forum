import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import our contract ABI (a json representation of our contract's public interface).
// The hardhat compiler writes this file to artifacts during compilation.
import CommentsContract from "../smart/artifacts/contracts/comments.sol/Comments.json";

// export interface Comment {
//   id: string;
//   topic: string;
//   message: string;
//   creator_address: string;
//   created_at: BigNumber;
// }

// export enum EventType {
//   CommentAdded = "CommentAdded",
// }
const useCommentsContract = () => {
  // An ethers.Signer instance associated with the signed-in wallet.
  // https://docs.ethers.io/v5/api/signer/
  const [signer] = useSigner();
  // An ethers.Provider instance. This will be the same provider that is  
  // passed as a prop to the WagmiProvider.
  const provider = useProvider();

  // This returns a new ethers.Contract ready to interact with our comments API.
  // We need to pass in the address of our deployed contract as well as its abi.
  // We also pass in the signer if there is a signed in wallet, or if there's
  // no signed in wallet then we'll pass in the connected provider.
  const contract = wagmi.useContract({
    addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    contractInterface: CommentsContract.abi,
    signerOrProvider: signer.data || provider,
  });

  // Wrapper to add types to our getComments function.
  const getComments = async (topic) => {
    let comments = contract.getComments(topic);
    return comments;
  };

  // Wrapper to add types to our addComment function.
  const addComment = async (topic, message) => {
    // Create a new transaction
    const tx = await contract.addComment(topic, message);
    // Wait for transaction to be mined
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getComments,
    addComment,
  };
};

export default useCommentsContract;