import React, { useContext } from "react";
import homeIcon from "../icons/home.svg";
import searchIcon from "../icons/search.svg";
import peopleIcon from "../icons/people.svg";
import messageIcon from "../icons/message.svg";
import friendsIcon from "../icons/friends.svg";
import { Link } from "react-router-dom";
import { CurrentActionContext } from "../Contexts";

function NavLinks() {
  const { currentAction, setCurrentAction } = useContext(CurrentActionContext);
  return (
    <div className="flex items-center justify-between bg-black px-3 rounded-lg w-full font-normal text-base text-slate-300 select-none">
      <button
        className={`py-2 px-4 rounded-sm ${
          currentAction === "home" && "bg-qx-s-light"
        }`}
        onClick={() => setCurrentAction("home")}
      >
        <img src={homeIcon} alt="Home" className="w-5" />
      </button>
      <button
        className={`py-2 px-4 rounded-sm ${
          currentAction === "search" && "bg-qx-s-light"
        }`}
        onClick={() => setCurrentAction("search")}
      >
        <img src={searchIcon} alt="Message" className="w-5" />
      </button>
      <button
        className={`py-2 px-4 rounded-sm ${
          currentAction === "message" && "bg-qx-s-light"
        }`}
        onClick={() => setCurrentAction("message")}
      >
        <img src={messageIcon} alt="message" className="w-5" />
      </button>
      <button
        className={`py-2 px-4 rounded-sm ${
          currentAction === "friends" && "bg-qx-s-light"
        }`}
        onClick={() => setCurrentAction("friends")}
      >
        <img src={friendsIcon} alt="Friends" className="w-5" />
      </button>
      <button
        to="/people"
        className={`py-2 px-4 rounded-sm ${
          currentAction === "people" && "bg-qx-s-light"
        }`}
        onClick={() => setCurrentAction("people")}
      >
        <img src={peopleIcon} alt="People" className="w-5" />
      </button>
    </div>
  );
}

export default NavLinks;
