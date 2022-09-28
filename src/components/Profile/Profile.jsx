import "./Profile.css";
import { selectUsers } from "../../store/slices/usersSlice/usersSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineInsertRowAbove } from "react-icons/ai";
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import ProfileImage from "../ProfileImage/ProfileImage";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { FaRegBookmark, FaUserTag } from "react-icons/fa";

const Profile = () => {
  const users = useSelector(selectUsers);
  const uniqeUser = users.initialUser;
  const navigate = useNavigate();
  console.log(uniqeUser);

  useEffect(() => {
    if (!uniqeUser.id) {
      navigate("/");
    }
  }, [uniqeUser]);

  return (
    <div className="container">
      <div className="profile">
        <>
          <ProfileImage />
          <ProfileInfo />
        </>
      </div>
      <div className="row">
        <div className="postsRow">
          <p className="rowIcon">{<AiOutlineInsertRowAbove />}</p>
          <p className="postsPosts">POSTS</p>
        </div>
        <div className="savedRow">
          <p className="rowIcon">{<FaRegBookmark />}</p>
          <p className="postsPostsS">SAVED</p>
        </div>
        <div className="taggedRow">
          <p className="rowIcon">{<FaUserTag />}</p>
          <p className="postsPostsT">TAGGED</p>
        </div>
      </div>
      <div className="posts">
        {users.initialUser.posts?.map((post) => {
          return <ProfilePosts key={post.id} id={post.id} src={post.img} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
