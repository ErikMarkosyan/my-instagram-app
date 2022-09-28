import React from "react";
import "./PostComments.css"

const PostComments = ({ username, comment }) => {
  return (
    <div className="postSender">
      <p>
        <b>{username}</b>&nbsp;{comment}
      </p>
    </div>
  );
};

export default React.memo(PostComments);
