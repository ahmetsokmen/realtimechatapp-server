import { connectToDB } from "./connect";
import { User } from "../models/user.model";

export async function seedUsers() {
  await connectToDB();

  User.countDocuments().then(function (count) {
    if (!count) {
      User.insertMany([
        {
          name: "John",
          surname: "Doe",
          username: "johndoe",
          status: "online",
        },
        {
          name: "Adam",
          surname: "Smith",
          username: "adamsmith",
          status: "online",
        },
        {
          name: "Benjamin",
          surname: "Linus",
          username: "benjaminlinus",
          status: "online",
        },
        {
          name: "Henry",
          surname: "Ford",
          username: "henryford",
          status: "offline",
        },
      ])
        .then(() => console.log("Data inserted"))
        .catch((error) => console.log(error));
    }
  });
}

export async function getUsers() {
  await connectToDB();
  return User.find({}).exec();
}

export async function login(username: string) {
  await connectToDB();
  var result = await User.findOne({ username: username }).exec();
  return result == null ? false : true;
}
