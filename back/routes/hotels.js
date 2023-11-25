import express from "express";

import * as HotelController from "./../controllers/HotelController.js";
import { checkToken, checkRights, checkAdmin } from "../utils/checkAuth.js";

const router = express.Router();

//GET ALL
router.get("/", HotelController.getAllHotels);

//GET ALL (BY CITY)
router.get("/find/byCity", HotelController.getAllHotelsByCity);

//GET ALL (BY FEATURE)
router.get("/find/byFeature", HotelController.getAllFeaturedHotels);

//GET ALL (COUNTED BY CITY)
router.get("/count/byCity", HotelController.countHotelsByCity);

//GET ALL (COUNTED BY TYPE)
router.get("/count/byType", HotelController.countHotelsByType);

//GET ALL ROOMS(BY HOTEL)
router.get("/room/:id", HotelController.getHotelRooms);

//GET
router.get("/:id", HotelController.getOneHotel);

//CREATE
router.post("/", checkToken, checkAdmin, HotelController.createHotel);

//UPDATE
router.patch("/:id", checkToken, checkAdmin, HotelController.updateHotel);

//DELETE
router.delete("/:id", checkToken, checkAdmin, HotelController.deleteHotel);

export default router;
