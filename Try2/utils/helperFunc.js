import jwt from "jsonwebtoken";


const secretKey = 'xyz1234'; // Replace with a secure secret key

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey,
        // { expiresIn: '3h' }
    );
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}
export { generateToken, verifyToken }

