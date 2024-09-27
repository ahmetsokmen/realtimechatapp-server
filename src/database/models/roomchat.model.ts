import mongoose from "mongoose";

export const RoomChat = mongoose.model(
  "room-chat-messages",
  new mongoose.Schema({
    sender: { type: String },
    date: { type: Date },
    content: { type: String },
  })
);
