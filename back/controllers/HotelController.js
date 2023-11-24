import HotelModel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const getAllHotels = async (req, res, next) => {
  // const failed = true;

  // if (failed) {
  //   return next(createError("401", "Not authenticated"));
  // }

  try {
    const hotels = await HotelModel.find().exec();

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const createHotel = async (req, res, next) => {
  try {
    const hotelDoc = new HotelModel(req.body);

    const newHotel = await hotelDoc.save();
    res.status(200).json(newHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const doc = await HotelModel.findByIdAndUpdate(
      req.params.id,
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

export const deleteHotel = async (req, res, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
