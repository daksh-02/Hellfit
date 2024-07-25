import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log("Access token verified:", decodedToken);

      req.user = decodedToken;
      return next();
    } catch (error) {
      if (error.message !== "jwt expired") {
        throw new ApiError(401, "Invalid access token");
      }

      // console.log("Access token expired, attempting to use refresh token");

      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        throw new ApiError(
          401,
          "Unauthorized request: No refresh token provided"
        );
      }

      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
        // console.log("Refresh token verified:", decodedRefreshToken);

        const user = await User.findById(decodedRefreshToken?._id).select(
          "-password -refreshToken"
        );

        if (!user) {
          throw new ApiError(401, "Invalid Refresh Token: User not found");
        }

        const accessToken = user.generateAccessToken();

        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          domain:
            process.env.NODE_ENV === "production"
              ? "backend-v1-inky.vercel.app"
              : undefined,
        };

        res.cookie("accessToken", accessToken, cookieOptions);

        req.user = user;
        next();
      } catch (refreshError) {
        console.error("Error verifying refresh token:", refreshError);
        throw new ApiError(401, "Invalid refresh token");
      }
    }
  } catch (error) {
    console.error("Error in verifyJWT middleware:", error);
    next(new ApiError(401, error.message || "Unauthorized request"));
  }
});
