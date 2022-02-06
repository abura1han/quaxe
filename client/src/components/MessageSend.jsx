import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions/message";
import attachmentIcon from "../icons/attachment.svg";
import sendIcon from "../icons/send.svg";

function MessageSend() {
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const messageInpElement = useRef();

  const messageDispatch = () => {
    if (message) {
      dispatch(sendMessage(message.trim()));
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        messageDispatch();
        messageInpElement.current.focus();
      }}
    >
      <div className="flex items-center justify-between pb-3 pt-2 px-3 bg-qx-deep border-l border-l-black rounded-t-lg">
        <div>
          <label
            htmlFor="attachment"
            tabIndex={0}
            className="p-3 bg-black rounded-full inline-block rotate-45"
          >
            <img src={attachmentIcon} alt="attach file" className="w-5" />
          </label>
          <input type="file" id="attachment" className="hidden" />
        </div>
        <div className="flex-1 px-2">
          <textarea
            className={`w-full bg-black resize-none px-2 pl-3 py-2 text-slate-200 outline-none ${
              isFocused ? "h-28 rounded-lg" : "h-11 rounded-full"
            }`}
            placeholder="Send some messages..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={messageInpElement}
          />
        </div>
        <div className="flex items-center">
          <button type="submit" className="p-3 bg-black rounded-full">
            <img src={sendIcon} alt="send message" className="w-5 rotate-45" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default MessageSend;
