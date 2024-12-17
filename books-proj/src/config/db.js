import mongoose from "mongoose";
import { config } from "./config.js";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to databse");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting database", err);
    });
    await mongoose.connect(config.databaseURL);
  } catch (err) {
    console.log("Error connecting to mongo db", err);
    process.exit(1); //stop the server because can't connect to db
  }
};

export default connectDb;
