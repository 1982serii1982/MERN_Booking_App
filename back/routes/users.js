import express from "express";
import * as UserController from "./../controllers/UserController.js";
import { checkToken, checkRights, checkAdmin } from "../utils/checkAuth.js";

const router = express.Router();

//CHECK TOKEN
router.get("/checktoken", checkToken, (req, res, next) => {
  res.send("you are authenticated");
});

//CHECK USER RIGHTS
router.get("/checkrights/:id", checkToken, checkRights, (req, res, next) => {
  res.send("you are authorized user");
});

//CHECK ADMIN
router.get("/checkadmin", checkToken, checkAdmin, (req, res, next) => {
  res.send("you are authorized admin");
});

//GET ALL
router.get("/", checkToken, checkAdmin, UserController.getAllUsers);

//GET
router.get("/:id", checkToken, checkRights, UserController.getOneUser);

//UPDATE
router.patch("/:id", checkToken, checkRights, UserController.updateUser);

//DELETE
router.delete("/:id", checkToken, checkRights, UserController.deleteUser);

export default router;
