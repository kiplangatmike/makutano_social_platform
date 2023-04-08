import React from "react";
import PropTypes from "prop-types";

const CommentSection = () => {
  const comments = ["hello, how you", "ill be visiting", "congratulations"];
  return (
    <div className="px-5 py-2">
      <h2>comments</h2>
      <form className="flex flex-col">
        <label>Leave a comment</label>
        <input
          className="rounded-sm px-2 py-1"
          placeholder="type"
          title="comment"
        ></input>
      </form>
      {comments.map((comment, index) => (
        <div key={index}>{comment}</div>
      ))}
    </div>
  );
};

export default CommentSection;
