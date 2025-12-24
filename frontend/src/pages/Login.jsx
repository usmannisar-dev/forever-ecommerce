import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, SetCurrentState] = useState("Login");
  const { token, SetToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, SetName] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");

  const toggleState = () => {
    SetCurrentState(currentState === "Login" ? "Sign Up" : "Login");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.success) {
        SetToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        SetName("");
        SetEmail("");
        SetPassword("");

        toast.success(response.data.message || "Success!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center lg:w-[40%] sm:max-w-96 m-auto mt-14 gap-14 text-gray-800"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name input only for Sign Up */}
      {currentState === "Sign Up" && (
        <input
          onChange={(e) => SetName(e.target.value)}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          value={name}
        />
      )}

      {/* Email */}
      <input
        onChange={(e) => SetEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
      />

      {/* Password */}
      <input
        onChange={(e) => SetPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
      />

      {/* Links */}
      <div className="w-full flex justify-between text-sm mt-[-28px]">
        <p className="cursor-pointer text-blue-900">Forgot your password</p>

        {currentState === "Login" ? (
          <p onClick={toggleState} className="cursor-pointer">
            Create Account
          </p>
        ) : (
          <p onClick={toggleState} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      {/* Button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
