import UserModel from "../models/User.js";
import { createError } from "../utils/error.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const doc = await UserModel.findByIdAndUpdate(
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

export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
};
