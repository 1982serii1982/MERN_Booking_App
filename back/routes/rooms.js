import express from "express";

import * as RoomController from "./../controllers/RoomController.js";
import { checkToken, checkRights, checkAdmin } from "../utils/checkAuth.js";

const router = express.Router();

//GET ALL
router.get("/", RoomController.getAllRooms);

//GET ONE
router.get("/:roomId", RoomController.getOneRoom);

//CREATE ROOM IN HOTEL (WITH ID)
router.post("/:hotelId", checkToken, checkAdmin, RoomController.createRoom);

//UPDATE
router.patch("/:roomId", checkToken, checkAdmin, RoomController.updateRoom);

//DELETE
router.delete(
  "/:roomId/:hotelId",
  checkToken,
  checkAdmin,
  RoomController.deleteRoom
);

export default router;
