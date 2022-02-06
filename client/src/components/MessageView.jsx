import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageView() {
  const profile = useSelector((state) => state.profile);
  const chatTarget = useSelector((state) => state.chatTarget);
  const messages = useSelector((state) => state.messages);
  const [userMessages, setUserMessages] = useState([]);

  const msgElement = useRef();

  useEffect(() => {
    const filteredMessages = messages.filter(
      (m) => m.sentBy === chatTarget._id || m.sentTo == chatTarget._id
    );
    setUserMessages(filteredMessages);
  }, [messages, chatTarget]);

  // Scroll message
  useEffect(() => {
    msgElement.current.scrollIntoView();
  }, [userMessages]);

  return (
    <div>
      <ul className="text-white px-8 message-list">
        {userMessages.map(({ message, sentBy }, key) => (
          <li
            key={key}
            className={`border-b border-b-qx-line flex pb-4 mt-3 last:border-none ${
              sentBy === profile._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                sentBy === profile._id ? "bg-[#1e1e1e]" : "bg-qx-light"
              } inline-block px-2 py-2 rounded-sm max-w-[75%]`}
            >
              <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              >
                {message}
              </ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
      <div ref={msgElement}></div>
    </div>
  );
}

export default MessageView;
