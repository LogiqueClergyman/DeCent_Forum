import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Spinner, Stack, Center } from "@chakra-ui/react";
import Comment from "./Comment";
import CommentEditor from "./CommentEditor";
import useComments from "../hooks/useComments";
import useEvents from "../hooks/useEvents";

// interface CommentsProps {
//   topic: string;
// }

const Comments = (topic) => {
  const query = useComments(topic);
  const [loading, setLoading] = useState(false)
  useEvents({ topic });
  useEffect(() => {
    if(query.isLoading) setLoading(true);
    else setLoading(false);
  },[query])
  
  return (
    <Box>
      {loading ? (
        <Center p={8}>
          <Spinner />
        </Center>
      ) :
      (<Stack spacing={4}>
        {console.log(query)}
        {query.data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        {query.isFetched && <CommentEditor topic={topic} />}
      </Stack>)}
    </Box>
  );
};

export default Comments;