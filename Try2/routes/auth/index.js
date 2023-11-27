import express from "express";
// import { registerUser, getUserById, updateUserById, deleteUserById, login } from "../../controller/authcontroller.js";
import { registerUser, getUserById, updateUserById, deleteUserById, login } from "../../controller/authController.js";
import validateRequest from "../../middleware/validateRequest.js";
import { registerValidations, loginValidations, updateValidations } from "./validations.js";
import authentication from "../../middleware/authentication.js";
const router = express.Router();



router.get("/userData", authentication, getUserById);
router.post("/register", registerValidations, validateRequest, registerUser);
router.post("/login", loginValidations, validateRequest, login)
router.put("/updateUser", authentication, updateValidations, validateRequest, updateUserById)
router.delete("/deleteUser", authentication, deleteUserById);

export default router