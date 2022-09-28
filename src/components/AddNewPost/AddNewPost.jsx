import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../store/slices/postsSlice/postsSlice";
import {
  addNewPostForInitialUser,
  selectUsers,
} from "../../store/slices/usersSlice/usersSlice";
import "./AddNewPost.css";

const AddNewPost = () => {
  const formRef = useRef(null);
  const { initialUser } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!initialUser.id) {
      navigate("/");
    }
  }, [initialUser]);
  const submit = (e) => {
    e.preventDefault();

    if (formRef.current[0].value) {
      const newPost = {
        id: new Date().getTime().toString(),
        username: initialUser.username,
        description: formRef.current[1].value,
        img: formRef.current[0].value,
        likes: Math.floor(Math.random() * 1000),
        comments: [],
      };
      dispatch(addNewPost(newPost));
      dispatch(addNewPostForInitialUser(newPost));
      navigate("/main");
    }

    formRef.current[0].value = "";
    formRef.current[1].value = "";
  };

  return (
    <div className="containerAdd">
      <form className="addForm" ref={formRef} onSubmit={submit}>
        <div className="addDiv">
          <b>Create new post</b>
          <hr/>
          <input placeholder="Add image url here" />
          <br></br>
          <input placeholder="Add description" />
          <br></br>
          <button>Add new post</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
