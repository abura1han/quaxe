import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MessageSend from "./MessageSend";
import MessageView from "./MessageView";

function ChatSpace() {
  const chatTarget = useSelector((state) => state.chatTarget);

  return (
    <>
      {chatTarget && (
        <div className="flex flex-1 flex-col justify-between h-screen">
          <div>
            <Header
              avatar={chatTarget.avatar}
              userName={chatTarget.userName}
              name={chatTarget.name}
              isFriend={chatTarget.friend}
            />
          </div>
          <div className="flex-1 bg-black h-full overflow-y-auto scroll-smooth">
            <MessageView />
          </div>
          <div>
            <MessageSend />
          </div>
        </div>
      )}
    </>
  );
}

export default ChatSpace;
