import express from "express";
import cors from "cors";
import ConnectToDB from "./db/db.js";
import { setupRedis } from "./db/cache.js";

const app = express();
const PORT = process.env.PORT;

import postRoutes from "./routes/postroutes.js";
import userRoutes from "./routes/userroutes.js";
app.use(cors());
app.enable("trust proxy"); // trust the headers that nginx reverse proxy sets so that we can acess stuff like original ip address of the client etc
app.use(await setupRedis());
app.use(express.json());
//localhost:3000/
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

// app.get("/api/v1", (req, res) => { // to test nginx reverse proxy load balancing ability
//   console.log("requested the wrong route bro");
// });
// app.get("/api/v2", (req, res) => {
//   console.log("requested the right route bro");
//   res.status(200).json({
//     status: "success",
//     message: "you are in the right place",
//   });
// });

const startListening = () => {
  try {
    app.listen(PORT, () => {
      console.log("mongoDB connected using dns");
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error(error.message);
  }
};

ConnectToDB()
  .then((data) => startListening())
  .catch((err) => console.log("could not set up the server " + err.message));
