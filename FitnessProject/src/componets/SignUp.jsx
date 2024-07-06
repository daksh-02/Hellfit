import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import photo from "../images/loginPageImage.jpg";
import { localHost } from "../constants.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEverything } from "../store/UserSlice.js";


function SignUp(data) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { register, handleSubmit } = useForm();
  const signUp = async (data) => {
    try {
      const url = `${localHost}/users/register`;
      console.log(data);
      const formData = new FormData();
  
      Object.keys(data).forEach((key) => {
        if (key !== "avatar") {
          formData.append(key, data[key]);
        }
      });
  
      formData.append("avatar", data.avatar[0]);
  
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      const res = await response.json();
      console.log(res);
  
      const login = await fetch(`${localHost}/users/login`, {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
  
      const loginResponse = await login.json(); 
      dispatch(setEverything(loginResponse.data.user)); 
      navigate('/');
    } catch (error) {
      alert("Enter valid data ")
    }
  };
  return (
    <div className="flex mt-2 w-full h-3/4">
      <div className="flex-1 mt-auto mb-auto h-full">
        <h1 className="text-6xl">Welcome</h1>
        <h3>Welcome! Please enter your details</h3>

        <form action="" onSubmit={handleSubmit(signUp)} className="mt-8">
          <Input
            type="text"
            label="Fullname:"
            placeholder="Enter your Fullname"
            {...register("fullName", {
              required: true,
            })}
          />
          <Input
            type="text"
            label="Username:"
            placeholder="Enter your Username"
            {...register("username", {
              required: true,
            })}
          />
          <Input
            type="email"
            label="Email:"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
          />
          <Input
            type="password"
            label="Password:"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Input
            type="file"
            label="Avatar Image:"
            {...register("avatar", {
              required: true,
            })}
          />
          <Button type="submit" className="w-1/2 mt-8" bgColor="bg-[#FF2625]">
            SignUP
          </Button>
        </form>
      </div>
      <div className="flex-1">
        <img src={photo} alt="" />
      </div>
    </div>
  );
}

export default SignUp;
