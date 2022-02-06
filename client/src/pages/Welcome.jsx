// This page for check auth, validate agter user login
// If users does not have access token then redirect to login page

import Cookies from "js-cookie";
import React, { useEffect } from "react";
import appConfigs from "../appConfig";

function Welcome() {
  const checkToken = () => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      window.location = "/auth";
      return;
    }

    // Token check
    fetch(`${appConfigs.serverUrl}/api/token_check`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          Cookies.remove("access_token");
          window.location = "/auth";
          return;
        }

        window.location = "/chat";
      });
  };

  useEffect(() => checkToken(), []);

  return <div className="text-blue-500 text-lg">Loading...</div>;
}

export default Welcome;
