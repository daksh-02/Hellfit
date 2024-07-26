import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import photo from "../images/loginPageImage.jpg";
import { localHost } from "../constants.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    setIsLoading(true); // Set loading state to true
    try {
      const url = `${localHost}/users/register`;
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
      alert("User signed up successfully. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Username or email already exists");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex mt-5 mx-10 w-full h-3/4">
      <div className="flex-1 mt-auto mb-auto h-full">
        <h1 className="text-6xl">Welcome</h1>
        <h3>Welcome! Please enter your details</h3>

        <form action="" onSubmit={handleSubmit(signUp)} className="mt-8">
          <Input
            type="text"
            label="Fullname:"
            placeholder="Enter your Fullname"
            {...register("fullName", { required: true })}
          />
          <Input
            type="text"
            label="Username:"
            placeholder="Enter your Username"
            {...register("username", { required: true })}
          />
          <Input
            type="email"
            label="Email:"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            label="Password:"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Input
            type="file"
            label="Avatar Image:"
            {...register("avatar", { required: true })}
          />
          <Button
            type="submit"
            className="w-1/2 mt-8"
            bgColor="bg-[#FF2625]"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Signing Up..." : "Sign Up"} 
          </Button>
        </form>
      </div>
      <div className="flex-1">
        <img src={photo} alt="Login" />
      </div>
    </div>
  );
}

export default SignUp;
