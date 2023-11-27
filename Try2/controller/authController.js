
import User from "../model/User.js";
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from "../Utils/helperFunc.js";
import bodyParser from "body-parser";

export const registerUser = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create({
            firstName, lastName, email, password: hashedPassword
        }).then((data) => {
            // console.log("+++++++++++++++++++++", data?.-id)
            const token = generateToken({ _id: data?._id })
            res.status(200).send({
                message: "User created successfully",
                success: true,
                data: {
                    data,
                    accessToken: token
                }
            })
        }).catch((error) => {
            let message = null;
            if (error.errors) {
                const errorKeys = Object?.keys(error.errors);
                message = errorKeys.map((er) => {
                    const data = error.errors[er]?.message
                    return data;
                });
            } else {
                message = error.message
            }

            res.status(400).send({
                message,
                success: false
            })
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            success: false
        })
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id
        }).select({ password: false })

        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        };

        res.status(200).send({
            succses: true,
            message: "data fetch succesfully",
            data: user
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateUserById = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const user = await User.findOneAndUpdate({ _id: req.user._id }, {
            $set: {
                firstName,
                lastName,
                email,
                password
            },

        }, { new: true })
        if (!user) {
            res.status(404).send({ message: "User Not found" })
        } else {
            res.status(200).send({
                success: true,
                message: "User updated successfully",
                data: user
            })
        }


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.user._id })
        if (!user) {
            res.status(404).send({
                message: "User not found! "
            })
        } else {
            res.status(200).send({
                success: true,
                message: "User deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }

}
export const login = async (req, res) => {
    const { email, password } = req?.body
    // const token = req?.headers?.authorization?.split(" ")[1]
    // const verifydata = verifyToken(token)
    // const _id = verifydata?.id
    // console.log("verify data: " + JSON.stringify(verifydata))
    // accessToken=
    // console.log("*******************", token)

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                message: "email does not exist!"
            })
        }
        const isVerified = await bcrypt.compare(password, user.password);
        if (!isVerified) {
            res.status(400).send({
                message: "password doest not match"
            })
        } else {
            const token = generateToken({ _id: user?._id })

            res.status(200).send({
                success: true,
                message: "User login Successfully",
                data: user,
                accessToken: token

            })
        }

    } catch (error) {

    }
}
