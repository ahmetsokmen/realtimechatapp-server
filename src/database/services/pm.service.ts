import { connectToDB } from "./connect";
import { PM } from "../models/private-message.model";

export async function seedPM() {
  await connectToDB();
  PM.countDocuments().then(function (count) {
    if (!count) {
      PM.insertMany([
        //#region john to all 1
        {
          sender: "johndoe",
          receiver: "adamsmith",
          date: new Date(),
          content: "john to adam 1",
        },

        {
          sender: "johndoe",
          receiver: "benjaminlinus",
          date: new Date(),
          content: "john to ben 1",
        },

        {
          sender: "johndoe",
          receiver: "henryford",
          date: new Date(),
          content: "john to henry 1",
        },

        //#endregion
        //#region john to all 2
        {
          sender: "johndoe",
          receiver: "adamsmith",
          date: new Date(),
          content: "john to adam 2",
        },

        {
          sender: "johndoe",
          receiver: "benjaminlinus",
          date: new Date(),
          content: "john to ben 2",
        },
        {
          sender: "johndoe",
          receiver: "henryford",
          date: new Date(),
          content: "john to henry 2",
        },
        //#endregion
        //#region adam to all 1
        {
          sender: "adamsmith",
          receiver: "johndoe",
          date: new Date(),
          content: "adam to john 1",
        },

        {
          sender: "adamsmith",
          receiver: "benjaminlinus",
          date: new Date(),
          content: "adam to ben 1",
        },
        {
          sender: "adamsmith",
          receiver: "henryford",
          date: new Date(),
          content: "adam to henry 1",
        },
        //#endregion
        //#region ben to all 1
        {
          sender: "benjaminlinus",
          receiver: "johndoe",
          date: new Date(),
          content: "ben to john 1",
        },

        {
          sender: "benjaminlinus",
          receiver: "adamsmith",
          date: new Date(),
          content: "ben to adam 1",
        },
        {
          sender: "benjaminlinus",
          receiver: "henryford",
          date: new Date(),
          content: "ben to henry 1",
        },
        //#endregion
        //#region henry to all 1
        {
          sender: "henryford",
          receiver: "johndoe",
          date: new Date(),
          content: "henry to john 1",
        },

        {
          sender: "henryford",
          receiver: "adamsmith",
          date: new Date(),
          content: "henry to adam 1",
        },
        {
          sender: "henryford",
          receiver: "benjaminlinus",
          date: new Date(),
          content: "henry to ben 1",
        },
        //#endregion
      ])
        .then(() => console.log("Data inserted"))
        .catch((error) => console.log(error));
    }
  });
}

export async function getPMs() {
  await connectToDB();
  return PM.find({}).exec();
}

export async function getPrivateChat(sender: string, receiver: string) {
  await connectToDB();

  if (receiver == ""){//it has designed to use in chatleft component
    return PM.find()
    .or([
      { sender: sender},
      { receiver: sender},
    ])
    .exec();
  }

  else{
    return PM.find()//it has designed to use in chatright component
    .or([
      { sender: sender, receiver: receiver },
      { sender: receiver, receiver: sender },
    ])
    .exec();

  }
 
}

export async function sendPrivateMessage(pm: typeof PM) {
  //denenmedi
  await connectToDB();
  return PM.create(pm);
}
