import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const checkToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return next(createError(403, "Forbidden access"));
      // return res.status(403).json({
      //   err,
      // });
    }
  } else {
    // return res.status(403).json({
    //   message: "token missing",
    // });
    return next(createError(403, "Forbidden access"));
  }
};

export const checkRights = (req, res, next) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(createError(401, "Unauthorized access"));
    // return res.status(401).json({
    //   message: "Unauthorized access",
    // });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(createError(401, "Unauthorized access"));
    // return res.status(401).json({
    //   message: "Unauthorized access",
    // });
  }
};
