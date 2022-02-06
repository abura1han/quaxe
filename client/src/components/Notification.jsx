import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Notification({ children }) {
  const notification = useSelector((state) => state.notification);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    function timeExp() {
      setIsExpired(true);
    }
    setTimeout(() => timeExp, 3000);

    return () => {
      clearInterval(timeExp);
    };
  }, []);

  return (
    <>
      {!isExpired && (
        <div>
          {notification && (
            <div
              className={`fixed w-80 px-3 py-3 bg-qx-deep text-white bottom-5 left-5 rounded-sm border-l-4 ${
                notification.type === "success" && "border-l-green-500"
              } ${notification.type === "error" && "border-l-red-500"} ${
                notification.type === "info" && "border-l-sky-500"
              }`}
            >
              {notification.msg}
            </div>
          )}
        </div>
      )}
      {children && children}
    </>
  );
}

export default Notification;
