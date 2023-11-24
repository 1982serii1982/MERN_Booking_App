import HotelModel from "../models/Hotel.js";
import RoomModel from "../models/Room.js";
import { createError } from "../utils/error.js";

//GET ALL
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find().exec();

    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

//GET ONE
export const getOneRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.roomId);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//CREATE ROOM IN HOTEL (WITH ID)

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const roomDoc = new RoomModel(req.body);
    const newRoom = await roomDoc.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: newRoom._id },
      });
    } catch (error) {
      next(err);
    }

    res.status(200).json(newRoom);
  } catch (err) {
    next(err);
  }
};

//UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const doc = await RoomModel.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: req.body,
      },
      { new: true } //In acest caz se intoarce documentul deja updatat, daca e "false" , atunci in "doc" se va afla documentul updatat
    );

    res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};

//DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await RoomModel.findByIdAndDelete(req.params.roomId);

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.roomId },
      });
    } catch (error) {
      next(err);
    }

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
