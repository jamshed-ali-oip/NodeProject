import express from "express";
import { registerUser, getUserById, updateUserById, deleteUserById, login } from "../controller/authcontroller.js";

const router = express.Router();

router.get("/userData/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", login)
router.put("/updateUser/:id", updateUserById)
router.delete("/deleteUser/:id", deleteUserById);

export default router