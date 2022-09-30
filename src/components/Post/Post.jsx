import "./Post.css";
import { faUser, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiHeart } from "react-icons/fi";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { IoNavigateOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import withLessMore from "../../hoc/withLessMore";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/slices/postsSlice/postsSlice";
import { selectUsers } from "../../store/slices/usersSlice/usersSlice";
import { memo, useRef } from "react";
import PostComments from "../PostComments/PostComments";

const Post = ({
  id,
  username,
  img,
  description,
  comments,
  show,
  toggleShow,
  likes,
}) => {
  const user = <FontAwesomeIcon icon={faUser} />;
  const dots = <FontAwesomeIcon icon={faEllipsis} />;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { initialUser } = useSelector(selectUsers);

  const submit = (e) => {
    e.preventDefault();
    if (formRef.current[0].value) {
      dispatch(
        addComment({
          id: id,
          username: initialUser.username,
          text: formRef.current[0].value,
        })
      );
      formRef.current[0].value = "";
    }
  };

  return (
    <div className={show ? "postsContainer" : "postContainerWithoutComments"}>
      <div className="postUserContainer">
        <div className="usernameAvatar">
          <p className="avatar">{user} </p>{" "}
          <p className="usernameUser">{username}</p>
          <p className="usernameDots">{dots}</p>
        </div>
      </div>
      <div className="postPicture">
        <img src={img} alt="postPicture" />
      </div>
      <div className="iconContainer">
        <ul className="iconUl">
          <li>{<FiHeart />}</li>
          <li>{<FaRegComment />}</li>
          <li>{<IoNavigateOutline />}</li>
          <ul className="bookmarkIcon">
            <li>{<FaRegBookmark />}</li>
          </ul>
        </ul>
      </div>
      <div className="likesContainer">
        <p>{likes} likes</p>
      </div>
      <div className="postSender">
        <h4>{username}</h4>
        &nbsp; &nbsp;
        <p>{description}</p>
      </div>
      <div
        className="postComments"
        style={{ display: comments.length ? "block" : "none" }}
      >
        <p onClick={toggleShow} className="showHideComment">
          {show ? "Hide comments" : `View all ${comments.length} comments`}
        </p>
        {show
          ? comments.map((el) => {
              return (
                <PostComments
                  key={el.id}
                  username={el.username}
                  comment={el.body}
                />
              );
            })
          : null}
      </div>
      <div className="row"></div>
      <form ref={formRef} onSubmit={submit} className="addComment">
        <p className="emoji">{<BsEmojiSmile />}</p>
        <input
          placeholder="Add a comment..."
          onFocus={() => {
            if (!show) {
              toggleShow();
            }
          }}
        />
        <button className="postComment">Post</button>
      </form>
    </div>
  );
};

export default memo(withLessMore(Post));
