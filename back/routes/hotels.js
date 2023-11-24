import express from "express";

import * as HotelController from "./../controllers/HotelController.js";
import { checkToken, checkRights, checkAdmin } from "../utils/checkAuth.js";

const router = express.Router();

//GET ALL
router.get("/", HotelController.getAllHotels);

//GET
router.get("/:id", HotelController.getOneHotel);

//CREATE
router.post("/", checkToken, checkAdmin, HotelController.createHotel);

//UPDATE
router.patch("/:id", checkToken, checkAdmin, HotelController.updateHotel);

//DELETE
router.delete("/:id", checkToken, checkAdmin, HotelController.deleteHotel);

export default router;
