import mongoose from "mongoose";

export const User = mongoose.model(
  "users",
  new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true },
    status: { type: String }, //if one or more status may be added like suspended or banned, we should think status as collection and define it in another file to use.
  })
);
