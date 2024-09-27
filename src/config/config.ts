import dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const REST_PORT = process.env.REST_PORT
export const WS_PORT = process.env.WS_PORT
  

export const DB_CONN_STR =
  "mongodb+srv://ahmetsokmen1995:llBwXBfhpapXWoFu@cluster0.pzsxm.mongodb.net/RealTimeChatApp?retryWrites=true&w=majority&appName=Cluster0";
