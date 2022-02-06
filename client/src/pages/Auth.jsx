import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import setNotification from "../actions/notification";
import appConfigs from "../appConfig";
import logo from "../Quaxe.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Login
  const loginHandler = () => {
    fetch(`${appConfigs.serverUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          dispatch(setNotification({ type: "error", msg: data.error }));
          return;
        }

        // Set access token to cookies
        Cookies.set("access_token", data.access_token);

        // Redirect page to root '/'
        window.location = "/";
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) {
          loginHandler();
        }
      }}
    >
      <div className="mt-3">
        <label
          htmlFor="email"
          className="block text-white font-medium mb-1 text-base"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block text-white font-medium mb-1 text-base"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-green-600 px-5 py-2 rounded-sm text-white"
        >
          Login
        </button>
      </div>
    </form>
  );
}

function Signup() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  // Signup handler
  const signupHandler = () => {
    fetch(`${appConfigs.serverUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName,
        name,
        email,
        password,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          dispatch(setNotification({ type: "error", msg: data.error[0].msg }));
          return;
        }

        dispatch(
          setNotification({
            type: "success",
            msg: "Account creation successful",
          })
        );

        // Redirect page to root '/'
        setTimeout(() => window.location.reload(), 3000);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== rPassword) {
          dispatch(
            setNotification({
              type: "error",
              msg: "Incorrect password in Repeat password field",
            })
          );
          return;
        }
        signupHandler();
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-white font-medium mb-1 text-base"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="userName"
          className="block text-white font-medium mb-1 text-base"
        >
          User name
        </label>
        <input
          type="text"
          id="userName"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="email"
          className="block text-white font-medium mb-1 text-base"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="password"
          className="block text-white font-medium mb-1 text-base"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="rpassword"
          className="block text-white font-medium mb-1 text-base"
        >
          Repeat password
        </label>
        <input
          type="password"
          id="rpassword"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setRPassword(e.target.value)}
          value={rPassword}
        />
      </div>
      <div className="mt-3">
        <label
          htmlFor="address"
          className="block text-white font-medium mb-1 text-base"
        >
          Address
        </label>
        <input
          type="text"
          id="address"
          required
          className="bg-qx-deep px-3 py-2 rounded-sm text-white w-full"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-green-600 px-5 py-2 rounded-sm text-white"
        >
          Signup
        </button>
      </div>
    </form>
  );
}

function Auth() {
  const [isLoginPage, setIsLoginpage] = useState(true);
  return (
    <div className="w-full max-w-[380px] mx-auto mt-5 px-2">
      <div>
        <img
          src={logo}
          alt="Quaxe"
          className="w-28 mobile:w-28 laptop:w-36 desktop:w-44"
        />
      </div>
      <div className="mt-5">
        {isLoginPage ? <Login /> : <Signup />}
        <div className="mt-5 text-white">
          {isLoginPage ? "I haven't account, " : "I have account, "}
          <button
            className="hover:underline text-green-500"
            onClick={() => setIsLoginpage(!isLoginPage)}
          >
            {isLoginPage ? "Signup here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
