import React, { useContext, useEffect, useState } from "react";
import FriendList from "../components/FriendList";
import Profile from "../components/Profile";
import NavLinks from "../components/NavLinks";
import Search from "../components/Search";
import collapsIcon from "../icons/collaps.svg";
import uparrowIcon from "../icons/uparrow.svg";
import helpIcon from "../icons/help.svg";
import qrcodeIcon from "../icons/qrcode.svg";
import gearIcon from "../icons/gear.svg";
import ChatSpace from "../components/ChatSpace";
import UserProfile from "../components/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { getAllFriends } from "../actions/friends";
import io from "socket.io-client";
import appConfigs from "../appConfig";
import { getProfile } from "../actions/profile";
import Cookies from "js-cookie";
import { addNewMessage, getAllPreviousMessages } from "../actions/message";
import { CurrentActionContext, UserDetailsContext } from "../Contexts";
import PeopleSpace from "../components/PeopleSpace";

const socket = io(appConfigs.serverUrl);

function Chat() {
  const [isOptOpen, setIsOptOpen] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const chatTarget = useSelector((state) => state.chatTarget);
  const sendMessage = useSelector((state) => state.sendMessage);

  const { currentAction } = useContext(CurrentActionContext);

  const { isUDOpen } = useContext(UserDetailsContext);

  // Check is authorized
  useEffect(() => {
    if (!Cookies.get("access_token")) {
      window.location = "/auth";
    }
  });

  // Get all friends and current user profile
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAllFriends());
    dispatch(getAllPreviousMessages());
  }, []);

  useEffect(() => {
    // Create and join room
    profile && socket.emit("join_room", { userId: profile._id });

    return () => {
      socket.off();
    };
  }, [profile]);

  // Send message
  useEffect(() => {
    sendMessage &&
      socket.emit("send_message", {
        sentBy: profile._id,
        sentTo: chatTarget._id,
        message: sendMessage,
      });

    return () => {
      socket.off();
    };
  }, [sendMessage]);

  // Recive message
  useEffect(() => {
    socket.on("recive_message", (data) => {
      dispatch(addNewMessage(data));
    });

    return () => {
      socket.off();
    };
  });

  return (
    <div className="w-full h-screen overflow-hidden flex items-start justify-start">
      <div className="flex flex-col bg-qx-deep h-screen w-full mobile:w-80 laptop:w-96">
        <div className="mt-3 px-4">
          <Profile />
        </div>
        <div className="mt-4 px-4">
          <NavLinks />
        </div>
        <div className="mt-2 px-4">
          <Search />
        </div>
        <div className="flex-1 bg-qx-light mt-4 py-2 px-4 rounded-2xl overflow-y-auto h-full">
          <FriendList />
        </div>
        <div className="px-5">
          <div className="flex justify-center">
            <img
              src={isOptOpen ? collapsIcon : uparrowIcon}
              onClick={() => setIsOptOpen(!isOptOpen)}
              className="w-5 cursor-pointer"
            />
          </div>
          {isOptOpen && (
            <div>
              <ul className="text-white">
                <li className="flex items-center py-2">
                  <div>
                    <img src={helpIcon} className="w-6" />
                  </div>
                  <div className="text-lg ml-4">Support</div>
                </li>
                <li className="flex items-center py-2">
                  <div>
                    <img src={qrcodeIcon} className="w-6" />
                  </div>
                  <div className="text-lg ml-4">Link device</div>
                </li>
                <li className="flex items-center py-2">
                  <div>
                    <img src={gearIcon} className="w-6" />
                  </div>
                  <div className="text-lg ml-4">Settings</div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 h-screen">
        {currentAction === "home" && (
          <div className="w-full h-screen flex items-center justify-center text-center text-white">
            <h1 className="text-3xl">Have a good time with QuaXe</h1>
          </div>
        )}
        {currentAction === "message" && chatTarget._id !== profile._id && (
          <ChatSpace />
        )}
        {currentAction === "people" && <PeopleSpace />}
      </div>
      {isUDOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000063] flex items-center laptop:items-start justify-center overflow-y-auto">
          <UserProfile />
        </div>
      )}
    </div>
  );
}

export default Chat;
