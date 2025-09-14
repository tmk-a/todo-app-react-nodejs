import mongoose from "mongoose";
import { DATABASE_URL } from "../env";

export async function connectToMongoose() {
  try {
    await mongoose.connect(DATABASE_URL, { dbName: "todo_react_app" });
    console.log("Connected to MongoDB Atlas with Mongoose");
  } catch (err) {
    console.error("Failed to connect to MongoDB with Mongoose=>", err);
    throw err;
  }
}

export async function disconnectToMongoose() {
  try {
    await mongoose.disconnect();
    console.log("Disconnecting to MongoDB Atlas with Mongoose");
  } catch (err) {
    console.error("Failed to disconnect to MongoDB with Mongoose=>", err);
    throw err;
  }
}
