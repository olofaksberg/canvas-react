/** @format */

import mongoose from "mongoose";
// import { paginate } from "mongoose-paginate-v2";

const { Schema, Types } = mongoose;

const scoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

// scoreSchema.plugin(paginate);

export const scoreModel = mongoose.model("Score", scoreSchema);
