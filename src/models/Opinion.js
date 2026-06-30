import mongoose from "mongoose";

const opinionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [100, "name must be at most 100 characters"],
    },
    note: {
      type: Number,
      required: [true, "note is required"],
      min: [0, "note must be at least 0"],
      max: [5, "note must be at most 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, "comment must be at most 1000 characters"],
      default: "",
    },
  },
  { timestamps: true }
);

export const Opinion = mongoose.model("Opinion", opinionSchema);
