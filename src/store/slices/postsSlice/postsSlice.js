import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async function () {
    const responsePosts = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=100"
    );
    const dataPosts = responsePosts.data;

    const responseComments = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const dataComments = responseComments.data;

    const data = dataPosts.map((el) => ({
      id: el.id,
      username: el.title.slice(0, el.title.indexOf(" ")),
      description: el.title.slice(el.title.indexOf(" ") + 1),
      img: el.url,
      likes: Math.ceil(Math.random() * 1000),
      comments: dataComments
        .filter((comments) => comments.postId === el.id)
        .map((comment) => ({
          id: comment.id,
          body: comment.body,
          username: comment.name.slice(0, comment.name.indexOf(" ")),
        })),
    }));
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
  },
  reducers: {
    addNewPost(state, { payload }) {
      return{
        ...state,
        data: [
          payload, 
          ...state.data
        ]
      }
    },
    addComment(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        data: state.data.map((post) => {
          if (post.id === payload.id) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: new Date().getTime().toString(),
                  body: payload.text,
                  username: payload.username,
                },
              ],
            };
          }
          return post;
        }),
      };
    },
    deletePost(state,{payload}){
      return {
        ...state,
        data: state.data.filter((el)=>el.id !== payload)
      }
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, { payload }) => {
      console.log("Loading...");
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        data: [...payload],
      };
    },
    [fetchPosts.rejected]: (state, { payload }) => {
      console.log("mi ban en chi");
    },
  },
});

export const selectPosts = (state) => state.posts;

export const { addComment, addNewPost, deletePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
