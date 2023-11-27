import { validationResult } from "express-validator";
import { verifyToken } from "../Utils/helperFunc.js";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next()
};

export default validateRequest;