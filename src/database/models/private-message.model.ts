import mongoose from "mongoose";

export const PM = mongoose.model(
  "private-messages",
  new mongoose.Schema({
    sender: { type: String },
    receiver: { type: String },
    date: { type: Date },
    content: { type: String },
  })
);
