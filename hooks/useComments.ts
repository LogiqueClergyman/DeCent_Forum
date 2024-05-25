import { useQuery } from "react-query";
import useCommentsContract from "./useCommentsContract";

// interface UseCommentsQuery {
//   topic: string;
// }

const useComments = ({ topic }) => {
  const contract = useCommentsContract();
  return useQuery(["comments", { topic, chainId: contract.chainId }], () => {
    contract.getComments(topic);
    console.log(contract.getComments(topic));
    
  });
};

export default useComments;
