import React from "react";
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

  const login = async (data) => {
    try {
      const response = await fetch(`${localHost}/users/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      dispatch(setEverything(res.data.user));
      console.log(res);
      navigate('/');
    } catch (error) {
      alert("Enter valid user details")
    }
  };
  return (
    <div className="flex w-full h-3/4 mt-5">
      <div className="flex-1 h-full mt-auto mb-auto">
        <h1 className="text-6xl">Welcome Back</h1>
        <h3 className="p-2">Welcome back! Please enter your details</h3>

        <form action="" onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              {...register("username", {
                required: true,
              })}
              className = "w-5/6"
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
              className = "w-5/6"
            />
            <Button type="submit" className="w-1/2 mt-8" bgColor="bg-[#FF2625]">
              Login
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-1 bg-green-100 h-full">
        <img src={pgImg} alt="" />
      </div>
    </div>
  );
}

export default Login;
