import React from "react";
import videoIcon from "../icons/video.svg";
import User from "./User";

function Header({ avatar, userName, name }) {
  return (
    <div className="flex items-center flex-1 justify-between py-1 border-l border-l-black bg-qx-deep">
      <div className="pl-4">
        <User
          avatar={avatar}
          userName={userName}
          name={name}
          type={"show_details"}
        />
      </div>
      <div className="pr-4 select-none">
        <button className="flex items-center py-1 px-2 mr-2 rounded-sm text-white bg-violet-600">
          <div>
            <img src={videoIcon} alt="video call" />
          </div>
          <div className="ml-2">Video call</div>
        </button>
      </div>
    </div>
  );
}

export default Header;
