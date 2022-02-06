import React, { useContext } from "react";
import moreIcon from "../icons/more.svg";
import configs from "../appConfig";
import PropTypes from "prop-types";
import { UserDetailsContext } from "../Contexts";

function User({ avatar, userName, name, email, address, bio, isActive, type }) {
  const { setIUDOpen } = useContext(UserDetailsContext);
  return (
    <div
      className="flex items-center cursor-pointer hover:bg-black rounded-md py-1 px-1 select-none"
      onClick={() => type === "show_details" && setIUDOpen((state) => !state)}
    >
      <div className="flex items-center justify-center">
        {avatar !== "NULL" ? (
          <img
            src={configs.userAvatar}
            alt=""
            className="w-12 p-1 border-green-600 border-2 rounded-full"
          />
        ) : (
          <div className="w-11 h-11 p-1  border-2 border-green-500 bg-qx-deep rounded-full text-2xl text-white flex items-center justify-center">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 px-3">
        <div className="text-white text-lg font-normal leading-none">
          {name}
        </div>
        <div className="text-green-500 text-sm">
          {type === "show_details" && `@${userName}`}
        </div>
      </div>
      <div>
        <img src={moreIcon} alt="User option" />
      </div>
    </div>
  );
}

// Default props
User.defaultProps = {
  avatar: "",
  userName: "",
  name: "",
  email: "",
  address: "",
  bio: "",
};

User.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  bio: PropTypes.string,
};

export default User;
