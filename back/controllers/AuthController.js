import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userDoc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      passwordHash: hash,
    });

    const newUser = await userDoc.save();

    res.status(200).json({
      message: "success",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "Login or password is incorrect"));
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPass) {
      return next(createError(404, "Login or password is incorrect"));
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET //este generat prin cmd (openssl rand -base64 32)
      //{
      //expiresIn: "30d",
      //expiresIn: 60,
      //}
    );

    const { passwordHash, isAdmin, ...userData } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true, // Informatia despre aceasta https://www.cookiepro.com/knowledge/httponly-cookie/
      })
      .status(200)
      .json({
        message: "success",
        user: userData,
      });
  } catch (err) {
    next(err);
  }
};
