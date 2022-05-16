/** @format */

import mongoose from "mongoose";

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

export const scoreModel = mongoose.model("Score", scoreSchema);
