import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { chatTarget } from "../actions/chatTarget";
import { UserDetailsContext } from "../Contexts";
import logo from "../Quaxe.png";

function ProfilePopup() {
  const { setIUDOpen } = useContext(UserDetailsContext);
  const currentTarget = useSelector((state) => state.chatTarget);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Cookies.remove("access_token");
    window.location = "/auth";
  };

  return (
    <div className="absolute top-full right-2 text-left px-2 py-2 w-52 mt-3 bg-black text-slate-200 rounded-lg">
      <ul>
        <li
          onClick={() => {
            dispatch(chatTarget(profile));
            setIUDOpen(true);
          }}
        >
          <span className="block">Profile</span>
        </li>
        <li className="my-2 border-b-gray-600 border-b"></li>
        <li>
          <span className="block" onClick={() => logoutHandler()}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const profile = useSelector((state) => state.profile);

  return (
    <div className="flex items-center justify-between select-none">
      <div tabIndex={0}>
        <img src={logo} alt={"Quaxe logo"} className="w-28" />
      </div>
      <button
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        type="button"
      >
        {profile.avatar !== "NULL" ? (
          <img
            src={profile.avatar}
            alt={"Quaxe logo"}
            className="w-10 h-10 p-1 rounded-full border-2 border-green-500"
          />
        ) : (
          <div className="w-10 h-10 p-1 rounded-full border-2 border-green-500 text-white text-lg">
            {String(profile.name).charAt(0)}
          </div>
        )}
        {isOpen && <ProfilePopup />}
      </button>
    </div>
  );
}

export default Profile;
