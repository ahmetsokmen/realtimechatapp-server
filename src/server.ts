import http from "http";
import express from "express";
import { REST_PORT, WS_PORT } from "./config/config";
import { corsHandler } from "./middlewares/corsHandler";
import { getUsers, seedUsers, login } from "./database/services/user.service";
import { getPMs, getPrivateChat, seedPM } from "./database/services/pm.service";
import {getRoomChat,seedRoomChat} from "./database/services/roomchat.service";
import { v4 as uuidv4 } from "uuid";
import { URL } from "url";
import { log } from "console";
const { WebSocketServer } = require("ws");

export let httpServer: ReturnType<typeof http.createServer>;
export const application = express();
httpServer = http.createServer(application);

export const Main = () => {
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  application.use(corsHandler);

  application.get("/seedData", async (req, res, next) => {
    await seedUsers();
    await seedPM();
    await seedRoomChat();
    return res.status(200).json("SeedDone");
  });

  //all pm doc list
  application.get("/pms", async (req, res, next) => {
    var data = await getPMs();
    return res.status(200).json(data);
  });
  //all users list
  application.get("/users", async (req, res, next) => {
    var data = await getUsers();
    return res.status(200).json(data);
  });

  application.get("/login", async (req, res, next) => {
    var username = req.query.username.toString();
    var data = await login(username);
    return res.status(200).json(data);
  });

  application.listen(REST_PORT, function () {
    console.log(`rest server is working at : ${REST_PORT}`);
  });



  var users = new WebSocketServer({ port: WS_PORT });
  users.on("connection", (ws, req) => {
    console.log(`ws server is working at : ${WS_PORT}`);
    ws.on("message", async (jsonBinary) => {
      var json = JSON.parse(jsonBinary)
      
      if (json.path  == "roomchat") {
        var data = await getRoomChat();
        users.clients.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      } 

      else if (json.path  == "privatechat") {
        var sender = json.sender;
        var receiver = json.receiver;
        let data = await getPrivateChat(sender, receiver);
        users.clients.forEach((client) => {
          client.send(JSON.stringify(data));
        });
      } 

    });
  });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close();

Main();
