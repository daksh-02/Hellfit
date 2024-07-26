import React, { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import pgImg from "../images/loginPageImage.jpg";
import { useForm } from "react-hook-form";
import { localHost } from "../constants.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEverything } from "../store/UserSlice.js";

function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${localHost}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      dispatch(setEverything(res.data.user));
      navigate("/");
    } catch (error) {
      alert("Enter valid user details");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-5 mx-10 w-full h-3/4">
      <div className="flex-1 mt-auto mb-auto h-full">
        <h1 className="text-6xl">Welcome Back</h1>
        <h3 className="p-2">Welcome back! Please enter your details</h3>

        <form action="" onSubmit={handleSubmit(login)} className="mt-8">
          <Input
            label="Username: "
            placeholder="Enter your username"
            type="text"
            {...register("username", {
              required: true,
            })}
            className="w-5/6"
          />
          <Input
            label="Password: "
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
            className="w-5/6"
          />
          <Button
            type="submit"
            className="w-1/2 mt-8"
            bgColor="bg-[#FF2625]"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
      <div className="flex-1 bg-green-100 h-full">
        <img src={pgImg} alt="Login" />
      </div>
    </div>
  );
}

export default Login;
