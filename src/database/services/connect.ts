import { connect, set } from "mongoose";
import { DB_CONN_STR } from "../../config/config";

export const connectToDB = async () => {
  set("strictQuery", false);
  const db = await connect(DB_CONN_STR)
    .then(() => console.log("Connected with Database..."))
    .catch((error) => console.log("Database connection error", error.message));
};
