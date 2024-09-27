import { connectToDB } from "./connect";
import { RoomChat } from "../models/roomchat.model";

export async function seedRoomChat() {
  await connectToDB();

  RoomChat.countDocuments().then(function (count) {
    if (!count) {
      RoomChat.insertMany([
        {
          sender: "johndoe",
          date: new Date(),
          content: "john to group 1",
        },
        {
          sender: "adamsmith",
          date: new Date(),
          content: "adam to group 1",
        },
        {
          sender: "benjaminlinus",
          date: new Date(),
          content: "ben to group 1",
        },
        {
          sender: "henryford",
          date: new Date(),
          content: "henry to group 1",
        },
        {
          sender: "johndoe",
          date: new Date(),
          content: "john to group 2",
        },
      ])
        .then(() => console.log("Data inserted"))
        .catch((error) => console.log(error));
    }
  });
}

export async function getRoomChat() {
  await connectToDB();
  return RoomChat.find({}).exec();
}
