import mongoose from "mongoose";
import { config } from "../../config.js";
const connectToDB = async () => {
  const { mongodb_userID, mongodb_password, mongodb_port, mongodb_ip } = config;
  const connectionURL = `mongodb://${mongodb_userID}:${mongodb_password}@${mongodb_ip}:${mongodb_port}/?authSource=admin`;
  return await mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectToDB;
