import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TrainingPlan } from "../models/training.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createTrainingObject = asyncHandler(async (req, res) => {
  const { name, day, exerciseID, exerciseIMG } = req.body;

  if (
    [name, day, exerciseID, exerciseIMG].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const user = await User.findById(req.user._id)
    .populate("workOutSplit")
    .select("-password -refreshToken");

  const exists = user.workOutSplit.find(
    (exercise) => exercise.exerciseID === exerciseID && exercise.day === day
  );

  if (!exists) {
    const trainingObj = await TrainingPlan.create({
      name,
      day,
      exerciseID,
      exerciseIMG,
      owner: req.user._id,
    });
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { workOutSplit: trainingObj._id },
      },
      { new: true }
    ).select("-password -refreshToken");

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user, trainingObj },
          "Exercise created and updated successfully"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          exists,
          "Exercise already exists in users workout plan"
        )
      );
  }
});

const deleteTrainingObject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const trainingObj = await TrainingPlan.findById(id);

  if (!trainingObj) {
    throw new ApiError(
      404,
      "Unable to delete item. The item does not exist in your Training Plan"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { workOutSplit: trainingObj._id },
    },
    { new: true }
  );

  await TrainingPlan.deleteOne(trainingObj._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { workOutSplit: user.workOutSplit },
        "Exercise removed from you workout plan"
      )
    );
});

const getTrainingObject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const trainingObj = await TrainingPlan.findById(id);

  if (!trainingObj) {
    throw new ApiError(404, "Training Object not found");
  }
  return res.status(200).json(trainingObj);
});

export { createTrainingObject, deleteTrainingObject, getTrainingObject };
