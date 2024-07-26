import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const genrateAccessandRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.file?.path;
  let avatar = null;

  if (avatarLocalPath?.trim() !== "") {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  }

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    avatar: avatar?.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPassCorrect = await user.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await genrateAccessandRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // 'None' for cross-site requests in production
    domain:
      process.env.NODE_ENV === "production"
        ? "hellfit-backed.vercel.app"
        : undefined, // Set your domain in production
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, newRefreshToken } = await genrateAccessandRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.findById(req.user._id).select("-password");

  user.username = username ? username : user.username;
  user.email = email ? email : user.email;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//   const avatarLocalPath = req.file?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is missing");
//   }

//   const newAvatar = await uploadOnCloudinary(avatarLocalPath);

//   if (!newAvatar.url) {
//     throw new ApiError(400, "Error while uploading on avatar");
//   }

//   const user = await User.findById(req.user._id);

//   const response = await deleteOnCloudinary(user.avatar);

//   console.log(response);

//   user.avatar = newAvatar.url;

//   await user.save({ validateBeforeSave: false });

//   return req
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { url: newAvatar.url },
//         "Image uploaded successfully"
//       )
//     );
// });

const updateAvatarImage = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const result = await deleteOnCloudinary(req.user.avatar);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

export {
  updateAvatarImage,
  updateAccountDetails,
  getCurrentUser,
  changeCurrentPassword,
  refreshAccessToken,
  logoutUser,
  loginUser,
  registerUser,
};
