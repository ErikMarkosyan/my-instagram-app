import React from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../store/slices/usersSlice/usersSlice";
import "./ChatMessage.css";

const ChatMessage = ({ id, user, text }) => {
  const dispatch = useDispatch();
  return (
    <div className="messagesContainer">
      <div className="mess">
        <div className={`${user} message`}>
          <p>{text}</p>&nbsp;
          {user === "me" ? (
            <span
              className="delteMessage"
              onClick={() => dispatch(deleteMessage(id))}
            >
              &times;
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessage);
