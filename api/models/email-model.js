/** @format */

import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const emailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const emailModel = mongoose.model("Email", emailSchema);