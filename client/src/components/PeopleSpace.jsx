import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chatTarget } from "../actions/chatTarget";
import { getPeople } from "../actions/people";
import { CurrentActionContext } from "../Contexts";
import User from "./User";

function PeopleSpace() {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people);

  const { setCurrentAction } = useContext(CurrentActionContext);

  useEffect(() => {
    dispatch(getPeople());
  }, []);

  return (
    <div>
      <ul className="max-w-[800px] mx-auto mt-5">
        <h2 className="text-white text-lg font-medium">Find people</h2>
        {people ? (
          people.map((data, key) => (
            <li
              key={key}
              className="flex justify-between items-center mt-4 border-b border-b-qx-line pb-5 last:border-none select-none"
              onClick={() => dispatch(chatTarget({ ...data }))}
            >
              <User
                avatar={data.avatar}
                userName={data.userName}
                name={data.name}
                email={data.email}
                address={data.address}
                type={"show_details"}
              />
              <div>
                <button
                  className="px-5 py-1 text-white border border-blue-500"
                  onClick={() => {
                    dispatch(chatTarget(data));
                    setCurrentAction("message");
                  }}
                >
                  Message
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-blue-500">Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default PeopleSpace;
