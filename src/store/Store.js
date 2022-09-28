import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postsSlice/postsSlice";
import { searchReducer } from "./slices/searchSlice/searchSlice";
import { textReducer } from "./slices/textSlice/textSlice";
import { usersReducer } from "./slices/usersSlice/usersSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "text-unique-root",
  storage,
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  text: textReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

export default store;
