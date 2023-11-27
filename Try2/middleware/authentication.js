import { verifyToken } from "../Utils/helperFunc.js";

const authentication = (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized",
        })
    }

    const user = verifyToken(token);
    if (!user) {
        return res.status(401).send({
            message: "Unauthorized User! Invalid token",
        })
    }
    req.user = user;
    next();
};

export default authentication;