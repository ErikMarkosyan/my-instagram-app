import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../store/slices/postsSlice/postsSlice";
import { deletePostForInitialUser } from "../../store/slices/usersSlice/usersSlice";
import "./ProfilePosts.css";

const ProfilePosts = ({ id, src }) => {
  const dispatch = useDispatch();
  return (
    <div className="post">
      <img alt="" src={`${src}`} />
      <span
        className="del"
        onClick={() => {
          dispatch(deletePostForInitialUser(id));
          dispatch(deletePost(id));
        }}
      >
        &times;
      </span>
    </div>
  );
};

export default React.memo(ProfilePosts);
