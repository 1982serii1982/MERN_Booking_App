import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log("Connection failed", err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use(cookieParser()); //The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies
app.use(express.json());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const whitelist = ["http://localhost:5173", "http://localhost:3000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
//     credentials: true,
//   })
// );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  connect();
  console.log("Conection success");
  console.log("Server is working!!!");
});
