import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserDetailsContext } from "../Contexts";
import { addFriend } from "../actions/friends";

function UserProfile() {
  const currentTarget = useSelector((state) => state.chatTarget);
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriend =
      friends && friends.find((f) => f._id === currentTarget._id);
    if (checkFriend) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, [friends, currentTarget]);

  const { setIUDOpen } = useContext(UserDetailsContext);
  return (
    <div className="flex w-80 flex-col relative text-white items-center px-4 bg-black border border-green-500 pb-5 laptop:mt-5">
      <div className="absolute right-0">
        <button
          className="px-4 py-1 border border-green-500"
          onClick={() => setIUDOpen((state) => !state)}
        >
          Close
        </button>
      </div>
      <div>
        <div className="mt-8 flex justify-center">
          {currentTarget.avatar !== "NULL" ? (
            <img src={currentTarget.avatar} alt={currentTarget.name} />
          ) : (
            <div className="w-24 h-24 p-1  border-2 border-green-500 bg-qx-deep rounded-full text-4xl text-white flex items-center justify-center">
              {currentTarget.name && currentTarget.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="text-center mt-1 text-2xl font-medium">
          {currentTarget.name}
        </div>
        <div className="text-center text-green-500">{currentTarget.email}</div>
      </div>
      {/* <div className="mt-5 text-left w-full">
        <div className="text-lg">Bio</div>
        <div>{currentTarget.bio}</div>
      </div> */}
      <div className="mt-5 text-left w-full">
        <div className="text-lg">Address</div>
        <div>{currentTarget.address}</div>
      </div>
      <div className="mt-5 text-left">
        {isFriend ? (
          <button className="py-1 px-2 rounded-sm text-white border border-red-600 hover:bg-red-600">
            Remove friend
          </button>
        ) : (
          <button
            className="py-1 px-2 rounded-sm text-white border border-green-600 hover:bg-green-600"
            onClick={() => {
              dispatch(addFriend(currentTarget));
            }}
          >
            Add friend
          </button>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
