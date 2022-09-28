import {
  deleteAllMessages,
  selectUsers,
  sendMessage,
} from "../../store/slices/usersSlice/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Chat.css";
import { useEffect, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";

const Chat = () => {
  const { initialUser } = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current[0].value) {
      dispatch(sendMessage(formRef.current[0].value));
    }
    formRef.current[0].value = "";
  };

  useEffect(() => {
    if (!initialUser.id) {
      navigate("/");
    }
  }, [initialUser]);

  return (
    <div className="chatContainer">
      <div className="userInfo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          alt=""
        />
        <h2>{initialUser.username}</h2>
        <button
          className="deleteAllMessages"
          onClick={() => dispatch(deleteAllMessages())}
        >
          Delete all messages
        </button>
      </div>
      <div className="chat">
        {initialUser.chat?.map((mes) => {
          return (
            <ChatMessage
              key={mes.id}
              id={mes.id}
              user={mes.user}
              text={mes.text}
            />
          );
        })}
      </div>
      <div className="inpButton">
        <form ref={formRef} onSubmit={handleSubmit}>
          <p>{<BsEmojiSmile />}</p>
          <input
            placeholder="Message..."
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Message...")}
          />
          <button className="sendMessage">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
