import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const trinaingPlanSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    exerciseID: {
      type: String,
      required: true,
    },
    exerciseIMG: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

trinaingPlanSchema.plugin(mongooseAggregatePaginate)

export const TrainingPlan = mongoose.model("TrainingPlan", trinaingPlanSchema);
