import HotelModel from "../models/Hotel.js";
import RoomModel from "../models/Room.js";

import { createError } from "../utils/error.js";

export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await HotelModel.find().exec();

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getAllHotelsByCity = async (req, res, next) => {
  const { city, min, max } = req.query;
  try {
    const hotels = await HotelModel.find({
      city,
      cheapestPrice: { $gte: min, $lte: max },
    })
      .collation({ locale: "en", strength: 2 })
      .exec();

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getAllFeaturedHotels = async (req, res, next) => {
  const { featured, limit, min, max, ...other } = req.query;
  try {
    const hotels = await HotelModel.find({
      featured,
      cheapestPrice: { $gt: min, $lt: max },
    })
      .limit(limit)
      .exec();

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countHotelsByCity = async (req, res, next) => {
  console.log(req.cookies);
  const cities = req.query.cities.split(",");

  const run = async () => {
    const list = await Promise.all(
      cities.map((city) => {
        let hotels = HotelModel.countDocuments({ city: city });
        return hotels;
      })
    );

    return list;
  };
  try {
    let result = await run();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const countHotelsByType = async (req, res, next) => {
  try {
    const hotelCount = await HotelModel.countDocuments({ type: "Hotel" });
    const resortCount = await HotelModel.countDocuments({ type: "Resort" });
    const apartmentCount = await HotelModel.countDocuments({
      type: "Apartment",
    });
    const villaCount = await HotelModel.countDocuments({ type: "Villa" });
    const cabinCount = await HotelModel.countDocuments({ type: "Cabin" });
    const cottageCount = await HotelModel.countDocuments({ type: "Cottage" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "resort", count: resortCount },
      { type: "apartment", count: apartmentCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
      { type: "cottage", count: cottageCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await HotelModel.findById(req.params.id).populate("rooms");
    // const list = await Promise.all(
    //   hotel.rooms.map((room) => {
    //     return RoomModel.findById(room);
    //   })
    // );

    // res.status(200).json(list);
    res.status(200).json(hotel);
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
        // $set: req.body,
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        distance: req.body.distance,
        $push: { photos: req.body.photos },
        desc: req.body.desc,
        title: req.body.title,
        rating: req.body.rating,
        $push: { rooms: req.body.rooms },
        cheapestPrice: req.body.cheapestPrice,
        featured: req.body.featured,
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
