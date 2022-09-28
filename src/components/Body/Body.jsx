import "./Body.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
} from "../../store/slices/postsSlice/postsSlice";
import Post from "../Post/Post";
import { selectSearch } from "../../store/slices/searchSlice/searchSlice";
import { selectUsers } from "../../store/slices/usersSlice/usersSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const search = useSelector(selectSearch);
  const { initialUser } = useSelector(selectUsers);
  const navigate = useNavigate();

  useEffect(() => {
    if (!posts.data.length) {
      dispatch(fetchPosts());
    }
  }, []);

  useEffect(() => {
    if (!initialUser.id) {
      navigate("/");
    }
  }, [initialUser]);

  return (
    <div className="bodyContainer">
      <div className="storiesContainer">
        <div>
          <img
            src="https://images.unsplash.com/photo-1663267759119-7bf2c50dde00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <p>beautyblonde</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1663267759119-7bf2c50dde00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <p>beautyblonde</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1663267759119-7bf2c50dde00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <p>beautyblonde</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1663267759119-7bf2c50dde00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <p>beautyblonde</p>
        </div>
      </div>
      {posts.data
        .filter((el) => el.username.includes(search))
        .map((el) => {
          return (
            <Post
              key={el.id}
              id={el.id}
              username={el.username}
              description={el.description}
              img={el.img}
              comments={el.comments}
              likes={el.likes}
            />
          );
        })}
    </div>
  );
};

export default Body;
