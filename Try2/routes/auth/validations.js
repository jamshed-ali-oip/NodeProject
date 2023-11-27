import { body } from "express-validator";

export const registerValidations = [
    body("firstName", "Enter a valid first name").isLength({ min: 3 }),
    body("lastName", "Enter a valid last name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail({ min: 7 }),
    body("password", "Enter a valid password").isLength({ min: 8 }),
];

export const loginValidations = [
    body("email", "Enter a valid email").isEmail({ min: 7 }),
    body("password", "Enter a valid password").isLength({ min: 8 }),
];

export const updateValidations = [
    body("firstName", "Enter a valid first name").optional().isLength({ min: 3 }),
    body("lastName", "Enter a valid last name").optional().isLength({ min: 3 }),
    body("email", "Enter a valid email").optional().isEmail({ min: 7 }),
    // body("password", "Enter a valid password").isEmail({ min: 8 }),
];