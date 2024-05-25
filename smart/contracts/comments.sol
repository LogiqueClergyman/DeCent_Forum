//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Comments {
    
    struct Comment {
        address author;
        string text;
        uint32 id;
        string topic;
        uint256 timestamp;
    }
    uint32 commentId;
    mapping(string => Comment[]) comments;
    event CommentAdded(Comment comment);

    function getComments(string calldata topic) public view returns (Comment[] memory) {
        return comments[topic];        
    }

    function addComment(string calldata topic, string calldata text) public {
        Comment memory comment = Comment(msg.sender, text, commentId, topic, block.timestamp);
        comments[topic].push(comment);
        commentId++;
        emit CommentAdded(comment);
    }
}