import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Body from "./components/Body/Body";
import Wrapper from "./pages/Wrapper";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import AddNewPost from "./components/AddNewPost/AddNewPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<Wrapper />}>
          <Route index element={<Body />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newPost" element={<AddNewPost />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
