import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetch-users",
  async function () {
    const usersResp = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    const usersData = usersResp.data;

    const postsResp = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=500"
    );

    const postsData = postsResp.data;

    const data = usersData.map((user) => {
      return {
        id: user.id,
        name: user.name.toLowerCase(),
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.address.city.toLowerCase(),
        about: user.company.catchPhrase,
        chat: [],
        posts: postsData
          .filter((post) => post.albumId === user.id)
          .map((post) => {
            return {
              id: post.id,
              username: post.title.slice(0, post.title.indexOf(" ")),
              description: post.title.slice(post.title.indexOf(" ") + 1),
              img: post.url,
              comments: [],
            };
          }),
      };
    });
    console.log(data);
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    initialUser: {},
  },
  reducers: {
    setInitialUser(state, { payload }) {
      if (
        state.data.some(
          (user) =>
            (user.username === payload.login || user.email === payload.login) &&
            user.password === payload.password
        )
      ) {
        return {
          ...state,
          initialUser: state.data.find(
            (user) =>
              (user.username === payload.login ||
                user.email === payload.login) &&
              user.password === payload.password
          ),
        };
      }
      return state;
    },
    logout(state) {
      return {
        ...state,
        initialUser: {},
      };
    },
    sendMessage(state, { payload }) {
      // console.log(payload);
      let currentAnswer = "";
      switch (payload.toLowerCase()) {
        case "barev":
          currentAnswer = "Barev";
          break;
        default:
          currentAnswer = "Հայերենի համար սեղմեք՝ 1";
          break;
      }
      return {
        ...state,
        initialUser: {
          ...state.initialUser,
          chat: [
            ...state.initialUser.chat,
            {
              id: "me" + new Date().getTime(),
              user: "me",
              text: payload,
            },
            {
              id: "you" + new Date().getTime(),
              user: "you",
              text: currentAnswer,
            },
          ],
        },
        data: [
          ...state.data.map((el) => {
            if (el.id === state.initialUser.id) {
              return {
                ...state.initialUser,
                chat: [
                  ...state.initialUser.chat,
                  {
                    id: "me" + new Date().getTime(),
                    sender: "me",
                    text: payload,
                  },
                  {
                    id: "you" + new Date().getTime(),
                    sender: "you",
                    text: currentAnswer,
                  },
                ],
              };
            }
            return el;
          }),
        ],
      };
    },
    deleteAllMessages(state) {
      return {
        ...state,
        initialUser: {
          ...state.initialUser,
          chat: [],
        },
        data: [
          ...state.data.map((el) => {
            if (el.id === state.initialUser.id) {
              return {
                ...state.initialUser,
                chat: [],
              };
            }
            return el;
          }),
        ],
      };
    },
    deleteMessage(state, { payload }) {
      let idx = state.initialUser.chat.findIndex((el) => el.id === payload);
      let secId = state.initialUser.chat[idx + 1].id;
      return {
        ...state,
        initialUser: {
          ...state.initialUser,
          chat: [
            ...state.initialUser.chat
              .filter((mes) => mes.id !== payload)
              .filter((mes) => mes.id !== secId),
          ],
        },
        data: [
          ...state.data.map((el) => {
            if (el.id === state.initialUser.id) {
              return {
                ...state.initialUser,
                chat: [
                  ...state.initialUser.chat
                    .filter((mes) => mes.id !== payload.id)
                    .filter((mes) => mes.id !== secId),
                ],
              };
            }
            return el;
          }),
        ],
      };
    },
    addNewPostForInitialUser(state, { payload }) {
      return {
        ...state,
        initialUser: {
          ...state.initialUser,
          posts: [payload, ...state.initialUser.posts],
        },
        data: [
          ...state.data.map((el) => {
            if (el.id === state.initialUser.id) {
              return {
                ...state.initialUser,
                posts: [payload, ...state.initialUser.posts],
              };
            }
            return el;
          }),
        ],
      };
    },
    deletePostForInitialUser(state, { payload }) {
      return {
        ...state,
        initialUser: {
          ...state.initialUser,
          posts: [...state.initialUser.posts.filter((el) => el.id !== payload)],
        },
      };
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        data: payload,
      };
    },
  },
});

export const selectUsers = (state) => state.users;

export const selectInitialUser = (state) => state.initialUser;

export const {
  setInitialUser,
  logout,
  sendMessage,
  deleteAllMessages,
  deleteMessage,
  addNewPostForInitialUser,
  deletePostForInitialUser,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
