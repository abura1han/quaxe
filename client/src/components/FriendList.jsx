import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import { chatTarget } from "../actions/chatTarget";
import { CurrentActionContext } from "../Contexts";

function FriendList() {
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const { setCurrentAction } = useContext(CurrentActionContext);
  return (
    <div>
      <ul>
        {friends ? (
          friends.map((data, key) => (
            <li
              key={key}
              className="after:absolute relative pt-1 mt-1 first:mt-2 after:top-full after:w-full after:pb-1 after:h-0 after:border-b after:border-b-black last:after:content-none"
              onClick={() => {
                dispatch(chatTarget({ ...data, friend: true }));
                setCurrentAction("message");
              }}
            >
              <User
                avatar={data.avatar}
                userName={data.userName}
                name={data.name}
                email={data.email}
                address={data.address}
                bio={data.bio}
              />
            </li>
          ))
        ) : (
          <li className="text-slate-300 text-center">No friends to show</li>
        )}
      </ul>
    </div>
  );
}

export default FriendList;
